const { parseReceivedData, workHitListHtml, workFormList, sendHtml } = require("../utils")

exports.add = (db, req, res) => {
  // 1. get insert data
  parseReceivedData(req, (work) => {
    // 2. insert data into mysql
    const sql = 'INSERT INTO work (hours, date, description) VALUES (?, ?, ?)';
    db.query(sql, [work.hours, work.date, work.description], (err) => {
      if (err) throw err;
      // 3. update ui shown
      exports.show(db, res);
    });
  });
}

exports.archive = (db, req, res) => {
  // 1. get insert data
  parseReceivedData(req, (work) => {
    // 2. update data from mysql
    const sql = 'UPDATE work SET archived=1 where id=?';
    db.query(sql, [work.id], (err) => {
      if (err) throw err;
      // 3. update ui shown
      exports.show(db, res);
    });
  });
}

exports.delete = (db, req, res) => {
  // 1. get insert data
  parseReceivedData(req, (work) => {
    // 2. delete data from mysql
    const sql = 'DELETE FROM work WHERE id=?';
    console.log(work);
    db.query(sql, [work.id], (err) => {
      if (err) throw err;
      // 3. update ui shown
      exports.show(db, res);
    });
  });
}

exports.show = (db, res, showArchive) => {
  // 1. get data
  const archiveValue = showArchive ? 1 : 0;
  const sql = 'SELECT * FROM work WHERE archived=? ORDER BY date DESC';
  db.query(sql, [archiveValue], (err, results) => {
    if (err) throw err;
    // 2. shown in ui
    let html = '';
    if (!archiveValue) {
      html += '<a href="/archived">Archive worker</a>'
    }
    html += workFormList();
    html += workHitListHtml(results);
    sendHtml(res, html);
  });
}

exports.showArchive = (db, res) => {
  exports.show(db, res, true);
}