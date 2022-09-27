#! /usr/bin/env node

import { program, Option } from 'commander';
import create from './create/create.js';
import logger from './logger/index.js';
import semver from 'semver';
import { createRequire } from 'module';
import { template_list, structure_list } from './common/config/config.js';

//@ts-ignore
const packageJson = createRequire(import.meta.url)('../package.json');

const requiredVersion = packageJson.engines.node;

// 检验node版本
if (!semver.satisfies(process.version, requiredVersion)) {
	logger.error('Minimum Node.js version not met :(');
	logger.info`You are using Node.js number=${process.version}, Requirement: Node.js number=${requiredVersion}.`;
	process.exit(1);
}

program
	.name('create-kinda')
	.description(`Quickly make kinda based project.`)
	// 配置版本号信息
	.version(`v${packageJson.version}`)
	.usage('<command> [option]');

// 项目创建命令
program
	// 定义命令和参数
	.command('create <app-name>')
	// init命令介绍
	.description('create program')
	// -f or --force 为强制创建，如果创建的目录存在则直接覆盖
	.addOption(
		new Option('-f, --force', 'overwrite target directory if it exist')
	)
	.addOption(
		new Option(
			'-s, --structure <structure>', 'choose the base structure of your project'
		).choices(structure_list)
	)
	.addOption(
		new Option(
			'-t --type <type>',
			'choose the type of your application',
		).choices(template_list.map((item) => item.value))
	)
	.action((name, options) => {
		create(name, options);
	});

program.parse(process.argv);
