#!/bin/bash

ENV="production"

ARCHIVE_NAME="./deploy/${ENV}/web.tar.gz"
PACKER_TMP_DIR="./packer_tmp"
TOTAL_STEPS=4

echo "[Step 1/${TOTAL_STEPS}] creating ${PACKER_TMP_DIR} ..."
if [ -d "${PACKER_TMP_DIR}" ]; then
  echo "remove ${PACKER_TMP_DIR}"
  rm -rf "${PACKER_TMP_DIR}"
fi
mkdir "${PACKER_TMP_DIR}"

echo "[Step 2/${TOTAL_STEPS}] cp files to ${PACKER_TMP_DIR} ..."
npm run update.version
cp -rf src server config public utils "${PACKER_TMP_DIR}"
# this tool is too big, install it on docker
rm -r "${PACKER_TMP_DIR}/utils/bin/jq-mac"
rm -r "${PACKER_TMP_DIR}/utils/bin/jq-linux"
cp .env.production tsconfig.json package.json package-lock.json next.config.js i18n.js global.d.ts "${PACKER_TMP_DIR}"
cp Makefile Makefile.include.mk "${PACKER_TMP_DIR}"

echo "[Step 3/${TOTAL_STEPS}] creating ${ARCHIVE_NAME} ..."
cd "${PACKER_TMP_DIR}"
tar czvf "../${ARCHIVE_NAME}" *  .env.production
cd ../

echo "[Step 4/${TOTAL_STEPS}] cleanup ..."
rm -rf "${PACKER_TMP_DIR}"
echo "--------------------------"
echo "done !"
