/* eslint-disable */
/**
 * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
 * License: MIT - http://mrgnrdrck.mit-license.org
 *
 * https://github.com/mroderick/PubSubJS
 */

const PubSub = {}
let messages = {}
let lastUid = -1
const ALL_SUBSCRIBING_MSG = '*'

function hasKeys(obj) {
  let key

  // eslint-disable-next-line no-restricted-syntax
  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return true
    }
  }
  return false
}

/**
 * Returns a function that throws the passed exception, for use as argument for setTimeout
 * @alias throwException
 * @function
 * @param { Object } ex An Error object
 */
function throwException(ex) {
  return function reThrowException() {
    throw ex
  }
}

function callSubscriberWithDelayedExceptions(subscriber, message, data) {
  try {
    subscriber(message, data)
  } catch (ex) {
    setTimeout(throwException(ex), 0)
  }
}

function callSubscriberWithImmediateExceptions(subscriber, message, data) {
  subscriber(message, data)
}

function deliverMessage(originalMessage, matchedMessage, data, immediateExceptions) {
  const subscribers = messages[matchedMessage]
  const callSubscriber = immediateExceptions
    ? callSubscriberWithImmediateExceptions
    : callSubscriberWithDelayedExceptions
  let s

  if (!Object.prototype.hasOwnProperty.call(messages, matchedMessage)) {
    return
  }

  // eslint-disable-next-line no-restricted-syntax
  for (s in subscribers) {
    if (Object.prototype.hasOwnProperty.call(subscribers, s)) {
      callSubscriber(subscribers[s], originalMessage, data)
    }
  }
}

function createDeliveryFunction(message, data, immediateExceptions) {
  return function deliverNamespaced() {
    let topic = String(message)
    let position = topic.lastIndexOf('.')

    // deliver the message as it is now
    deliverMessage(message, message, data, immediateExceptions)

    // trim the hierarchy and deliver message to each level
    while (position !== -1) {
      topic = topic.substr(0, position)
      position = topic.lastIndexOf('.')
      deliverMessage(message, topic, data, immediateExceptions)
    }

    deliverMessage(message, ALL_SUBSCRIBING_MSG, data, immediateExceptions)
  }
}

function hasDirectSubscribersFor(message) {
  const topic = String(message)
  const found = Boolean(
    Object.prototype.hasOwnProperty.call(messages, topic) && hasKeys(messages[topic]),
  )

  return found
}

function messageHasSubscribers(message) {
  let topic = String(message)
  let found = hasDirectSubscribersFor(topic) || hasDirectSubscribersFor(ALL_SUBSCRIBING_MSG)
  let position = topic.lastIndexOf('.')

  while (!found && position !== -1) {
    topic = topic.substr(0, position)
    position = topic.lastIndexOf('.')
    found = hasDirectSubscribersFor(topic)
  }

  return found
}

function publish(message, data, sync, immediateExceptions) {
  message = typeof message === 'symbol' ? message.toString() : message

  const deliver = createDeliveryFunction(message, data, immediateExceptions)
  const hasSubscribers = messageHasSubscribers(message)

  if (!hasSubscribers) {
    return false
  }

  if (sync === true) {
    deliver()
  } else {
    setTimeout(deliver, 0)
  }
  return true
}

/**
 * Publishes the message, passing the data to it's subscribers
 * @function
 * @alias publish
 * @param { String } message The message to publish
 * @param {} data The data to pass to subscribers
 * @return { Boolean }
 */
PubSub.publish = function (message, data) {
  return publish(message, data, false, PubSub.immediateExceptions)
}

/**
 * Publishes the message synchronously, passing the data to it's subscribers
 * @function
 * @alias publishSync
 * @param { String } message The message to publish
 * @param {} data The data to pass to subscribers
 * @return { Boolean }
 */
PubSub.publishSync = function (message, data) {
  return publish(message, data, true, PubSub.immediateExceptions)
}

/**
 * Subscribes the passed function to the passed message. Every returned token is unique and should
 * be stored if you need to unsubscribe
 * @function
 * @alias subscribe
 * @param { String } message The message to subscribe to
 * @param { Function } func The function to call when a new message is published
 * @return { String }
 */
PubSub.subscribe = function (message, func) {
  if (typeof func !== 'function') {
    return false
  }

  message = typeof message === 'symbol' ? message.toString() : message

  // message is not registered yet
  if (!Object.prototype.hasOwnProperty.call(messages, message)) {
    messages[message] = {}
  }

  // forcing token as String, to allow for future expansions without breaking usage
  // and allow for easy use as key names for the 'messages' object
  const token = `uid_${String((lastUid += 1))}`
  messages[message][token] = func

  // return token for unsubscribing
  return token
}

PubSub.subscribeAll = function (func) {
  return PubSub.subscribe(ALL_SUBSCRIBING_MSG, func)
}

/**
 * Subscribes the passed function to the passed message once
 * @function
 * @alias subscribeOnce
 * @param { String } message The message to subscribe to
 * @param { Function } func The function to call when a new message is published
 * @return { PubSub }
 */
PubSub.subscribeOnce = function (message, func) {
  const token = PubSub.subscribe(message, function () {
    // before func apply, unsubscribe message
    PubSub.unsubscribe(token)
    // eslint-disable-next-line prefer-rest-params
    func.apply(this, arguments)
  })
  return PubSub
}

/**
 * Clears all subscriptions
 * @function
 * @public
 * @alias clearAllSubscriptions
 */
PubSub.clearAllSubscriptions = function clearAllSubscriptions() {
  messages = {}
}

/**
 * Clear subscriptions by the topic
 * @function
 * @public
 * @alias clearAllSubscriptions
 * @return { int }
 */
PubSub.clearSubscriptions = function clearSubscriptions(topic) {
  let m

  for (m in messages) {
    if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
      delete messages[m]
    }
  }
}

/**
       Count subscriptions by the topic
     * @function
     * @public
     * @alias countSubscriptions
     * @return { Array }
    */
PubSub.countSubscriptions = function countSubscriptions(topic) {
  var m
  // eslint-disable-next-line no-unused-vars
  var token
  var count = 0
  for (m in messages) {
    if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
      for (token in messages[m]) {
        count++
      }
      break
    }
  }
  return count
}

/**
       Gets subscriptions by the topic
     * @function
     * @public
     * @alias getSubscriptions
    */
PubSub.getSubscriptions = function getSubscriptions(topic) {
  var m
  var list = []
  for (m in messages) {
    if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
      list.push(m)
    }
  }
  return list
}

/**
 * Removes subscriptions
 *
 * - When passed a token, removes a specific subscription.
 *
 * - When passed a function, removes all subscriptions for that function
 *
 * - When passed a topic, removes all subscriptions for that topic (hierarchy)
 * @function
 * @public
 * @alias subscribeOnce
 * @param { String | Function } value A token, function or topic to unsubscribe from
 * @example // Unsubscribing with a token
 * var token = PubSub.subscribe('mytopic', myFunc);
 * PubSub.unsubscribe(token);
 * @example // Unsubscribing with a function
 * PubSub.unsubscribe(myFunc);
 * @example // Unsubscribing from a topic
 * PubSub.unsubscribe('mytopic');
 */
PubSub.unsubscribe = function (value) {
  var descendantTopicExists = function (topic) {
      var m
      for (m in messages) {
        if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
          // a descendant of the topic exists:
          return true
        }
      }

      return false
    },
    isTopic =
      typeof value === 'string' &&
      (Object.prototype.hasOwnProperty.call(messages, value) || descendantTopicExists(value)),
    isToken = !isTopic && typeof value === 'string',
    isFunction = typeof value === 'function',
    result = false,
    m,
    message,
    t

  if (isTopic) {
    PubSub.clearSubscriptions(value)
    return
  }

  for (m in messages) {
    if (Object.prototype.hasOwnProperty.call(messages, m)) {
      message = messages[m]

      if (isToken && message[value]) {
        delete message[value]
        result = value
        // tokens are unique, so we can just stop here
        break
      }

      if (isFunction) {
        for (t in message) {
          if (Object.prototype.hasOwnProperty.call(message, t) && message[t] === value) {
            delete message[t]
            result = true
          }
        }
      }
    }
  }

  return result
}

export default PubSub
