import { Body, Controller, Ip, NotFoundException, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CredentialDTO } from './dto/credential.dto';
import { ConnexionRequest } from './interfaces/ConnexionRequest.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() credential: CredentialDTO, @Ip() ip: string) {
        return await this.authService.register(credential, ip);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: ConnexionRequest, @Res() res: Response) {
        const { user, ip } = req;
        if (!user.ips.includes(ip)) {
            throw new NotFoundException('Address IP not valid');
        }
        const jwtCookie = this.authService.generateJwtToken(user);
        res.setHeader('Set-Cookie', jwtCookie);
        return res.send(user);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout() {
        return await this.authService.disconnect();
    }

}
