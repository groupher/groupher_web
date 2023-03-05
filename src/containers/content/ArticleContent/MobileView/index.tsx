import ArticleLayout from './ArticleLayout'

const ArticleContent = (props) => {
  const { metric } = props

  switch (metric) {
    default: {
      return <ArticleLayout {...props} />
    }
  }
}

export default ArticleContent
