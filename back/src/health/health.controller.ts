import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import {ApiExcludeController} from '@nestjs/swagger';
import {ReadinessService} from "../readiness.service";

// Health-эндпоинт для hw4: smoke-проверка и AI-агент сверяют version
// с APP_VERSION на сервере. Подкручен из env-переменной APP_VERSION,
// которую compose прокидывает в контейнер из .env.development.compose.
// Если переменной нет — отдаём 'unknown' (не падаем).

@ApiExcludeController()
@Controller('health')
export class HealthController {
    constructor(private readonly readinessService: ReadinessService) {
    }

    @Get()
    getHealth(): { status: 'ok'; version: string } {
        return {
            status: 'ok',
            version: process.env.APP_VERSION ?? 'unknown 909090',
        };
    }

    @Get('ready')
    getReadiness(): string {
        if (!this.readinessService.isReady()) {
            throw new HttpException(
                'Backend is not ready. Check logs for details.',
                HttpStatus.SERVICE_UNAVAILABLE
            )
        } // 503

        return 'ready';
    }
}
