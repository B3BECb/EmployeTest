const { app, BrowserWindow } = require('electron');
const path                   = require('path');
const shell                  = require('shelljs');
const join                   = path.join;
const spawn                  = require('child_process').spawn;

import { AppConsts } from "./app/appConsts";

let mainWindow;
let mongoProcess;

const logTag = '[NOSQLCLIENT]';

app.commandLine.appendSwitch('remote-debugging-port', '9222');

function createWindow(page)
{
	mainWindow = new BrowserWindow({
		width:          800,
		height:         600,
		resizable:      false,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	mainWindow.loadFile(page);

	mainWindow.on('closed', function()
	{
		mainWindow = null;
	});
}

const beginStartingMongo = function(appRoot)
{
	console.log(logTag, 'trying to start mongod process');
	let path = join(appRoot, 'app', 'bin', 'mongod');
	if(process.platform === 'win32')
	{
		path += '.exe';
	}
	console.log(logTag, 'detected mongod executable path: ' + path);

	let dataDir;
	let lockfile;

	if(process.platform === 'win32')
	{
		dataDir = process.env.APPDATA;
	}
	else
	{
		if(process.platform === 'darwin')
		{
			dataDir = join(process.env.HOME, 'Library', 'Preferences');
		}
		else
		{
			if(process.platform === 'linux')
			{
				dataDir = join(process.env.HOME, 'var', 'local');
			}
		}
	}
	dataDir  = join(dataDir, 'EmployeTest', AppConsts.dbName);
	lockfile = join(dataDir, 'mongod.lock');
	console.log(logTag, 'detected mongod data directory: ' + dataDir);

	console.log(logTag, 'trying to create data dir and removing mongod.lock just in case');
	shell.mkdir('-p', dataDir);
	shell.rm('-f', lockfile);

	console.log(logTag, 'trying to spawn mongod process with port: ' + AppConsts.mongoPort);

	mongoProcess = spawn(path, [
		'--dbpath', dataDir,
		'--port', AppConsts.mongoPort,
		'--bind_ip', '127.0.0.1',
		'--smallfiles',
	]);

	mongoProcess.stdout.on('data', function(data)
	{
		console.log(logTag, '[MONGOD-STDOUT]', data.toString());

		if(/waiting for connections/.test(data.toString()))
		{
			console.log(logTag, '[MONGOD-STDOUT]', "waiting for connections");
			createWindow('./app/index.html');
		}
	});

	mongoProcess.stderr.on('data', function(data)
	{
		console.error(logTag, '[MONGOD-STDERR]', data.toString());
	});

	mongoProcess.on('exit', function(code)
	{
		console.log(logTag, '[MONGOD-EXIT]', code.toString());
	});

	mongoProcess.on('error', function(err)
	{
		console.log(logTag, '[MONGOD-ERROR]', err.toString());
		createWindow('./app/error.html');
	});
};

app.on('ready', () =>
{
	let appRoot = path.resolve(__dirname);
	beginStartingMongo(appRoot);
});

app.on('window-all-closed', function()
{
	//context.shutdownServer();

	if(process.platform !== 'darwin') app.quit();
});

// app.on('activate', function()
// {
// 	if(mainWindow === null) createWindow();
// });