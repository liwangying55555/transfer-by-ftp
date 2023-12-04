#!/usr/bin/env node
"use strict";

var path = require("path");

var fs = require("fs");

var program = require("commander");

var async = require("async");

var term = require("terminal-kit").terminal;

var PKG = require("./package.json"); // 版本号


program.version(PKG.version).description(term.blue("\n一键传输本地代码到远程服务器，解放双手\n\n"));
program.command("config <server>").description("<get> 展示全部项目列表| <set> 设置项目列表").action(function (server) {
  if (server == "get") {
    getFTPConfig();
    getConfig();
  } else if (server == "set") {
    setList();
  } else {
    term.red("config " + server + " 命令不存在，请重新输入。");
  }
});
program.command("add").description("添加项目路径").action(addProject);
program.command("start").description("开始一个ftp传输").action(startFTP);
program.parse(process.argv);
/** ------------------------------------------------- */

/*
 * get current registry
 */

function getCurrentRegistry(cbk) {
  npm.load(function (err, conf) {
    if (err) return exit(err);
    cbk(npm.config.get(FIELD_REGISTRY));
  });
} // 读取项目配置信息


function getConfig() {
  var config = require("./config.json");

  var data = [["distPath[本地目录]", "ftpPath[远程服务器目录]"]];
  Object.keys(config).forEach(function (name) {
    data.push([config[name].distPath, config[name].ftpPath]);
  });
  term.table(data, {
    hasBorder: false,
    width: 100
  });
} // 读取ftp配置


function getFTPConfig() {
  var config = require("./ftpConfig.json");

  for (var name in config) {
    var item = config[name];
    term(name + " = " + item + "\n");
  }

  term("\n");
}

function setList() {}

function addProject() {}

function startFTP() {}