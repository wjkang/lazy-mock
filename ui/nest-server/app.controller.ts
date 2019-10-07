import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import * as execa from 'execa'
import * as path from 'path'
import * as fs from 'fs'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Get('run')
	run(): string {
		const subprocess = execa('npm', ['run', 'start'], {
			stdio: ['inherit', 'pipe', 'inherit'],
			cwd: path.join('G:\\GitHubProject\\lazy-mock')
		})
		subprocess.stdout.on('data', buffer => {
			const text = buffer.toString().trim()
			if (text) {
				console.log(123,text)
			}
		})
		return '1111'
	}
}
