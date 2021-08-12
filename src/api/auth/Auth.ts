/** @format */

import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UserController from '../controllers/UserController';

class Auth {
	// public opts: { secretOrKey: string; jwtFromRequest: JwtFromRequestFunction };
	public usuario: number;

	constructor() {
		this.usuario = 0;
	}

	config() {
		const opts = {
			secretOrKey: process.env.SECRET,
			// jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		};

		const strategy = new Strategy(opts, (jwtPayload, done) => {
			UserController.getAuthId(jwtPayload.id)
				.then(user => {
					if (user) {
						this.usuario = user.id; //para a funcao serializeUser
						return done(null, { id: user.id /*, email: user.email*/ });
					}
					return done(null, false);
				})
				.catch(error => {
					return done(error, null);
				});
		});

		passport.use(strategy);

		passport.serializeUser((user, done) => done(null, this.usuario));

		passport.deserializeUser((id, done) => {
			UserController.getAuthId(this.usuario).then(user =>
				done(null, { id: user.id /*, email: user.email */ })
			);
		});

		return {
			initialize: () => passport.initialize(),
			authenticate: () => passport.authenticate('jwt', { session: true }),
			session: () => passport.session()
		};
	}
}

export default new Auth();
