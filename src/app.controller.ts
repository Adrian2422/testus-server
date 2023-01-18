import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@ApiExcludeEndpoint()
	@Get()
	index() {
		return 'Welcome to Testus api!';
	}
}
