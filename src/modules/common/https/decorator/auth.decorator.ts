import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const OAuth2Authorization = createParamDecorator(
    (_: unknown, ctx: ExecutionContext | any) => {
        const request = ctx.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        console.log(request.headers)
        if (!authHeader) {
            throw new UnauthorizedException({ message: 'Authentication is required' });
        }

        const [bearer, auth] = authHeader.split(' ');

        if (bearer !== 'Bearer') {
            throw new UnauthorizedException({ message: 'Invalid authentication scheme' });
        }

        return auth;
    }
);
