const express = require('express');
const router = express.Router();
const logger = require('../../libs/logger');

async function getLowdb() {
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');

  const adapter = new JSONFile('db.json');
  const db = new Low(adapter, {});
  try {
    await db.read();
    logger.info('成功读取数据库: ', db.data);
  } catch (error) {
    logger.error('读取数据库时出错: ', error);
  }
  return db;
}

router.get('/profile', async (req, res) => {
  logger.info('请求用户数据: ');
  const db = await getLowdb();
  res.json(db.data.profile);
});

router.post('/profile', async (req, res) => {
  const { name, email, phone, profession, location } = req.body;
  const db = await getLowdb();
  db.data.profile = { name, email, phone, profession, location };
  await db.write();
  logger.info('保存用户Profile信息: ', db.data.profile);
  res.json(db.data.profile);
});

module.exports = router;
