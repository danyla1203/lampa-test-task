const express = require('express');

class Router {
  constructor() {
    this.router = express.Router();
  }
  get(path, handler) {
    this.router.get(path, async (req, res) => {
      try {
        let result = await handler(req, res);
        res.json(result);
      } catch(e) {
        res.statusCode = e.statusCode || 500;
        res.json({
          statusCode: e.statusCode || 500,
          message: e.text || 'Server error'
        });
      }
    });
  }
  post(path, handler) {
    this.router.get(path, async (req, res) => {
      try {
        let result = await handler(req, res);
        res.json(result);
      } catch(e) {
        res.statusCode = e.statusCode || 500;
        res.json({
          statusCode: e.statusCode || 500,
          message: e.text || 'Server error'
        });
      }
    });
  }
}
module.exports.CustomRouter = Router;