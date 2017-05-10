import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import compression from 'compression';
const app = express();
app.use(compression());
// 静态文件
app.use('/dist', express.static('./dist/'));
app.use('/public', express.static('./public/'));
const users = {
    admin: { name: 'admin', password: 'admin' },
    zhongyuan: { name: 'zhongyuan', password: 'zhongyuan' },
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'mi',
    genid() {
        const d = new Date();
        let m = d.getMinutes().toString();
        m = m.replace(/^(\d){1}$/, '0$1');
        let s = d.getSeconds().toString();
        s = s.replace(/^(\d){1}$/, '0$1');
        return m + s;
    },
    cookie: { maxAge: 3000e3 },
    resave: false,
    saveUninitialized: false,
}));
app.post('/register', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    if (Object.prototype.hasOwnProperty.call(users, name)) {
        res.json({ success: false, message: `Username "${name}" already exist.` });
    }
    users[name] = { name, password };
    res.json({ success: true, user: { name } });
});
function authenticate(name, pass, fn) {
    if (!module.parent) {
        console.log('authenticating %s:%s', name, pass);    // eslint-disable-line no-console
    }
    const user = users[name];
    // query the db for the given username
    if (!user) return fn(new Error(`Can't find user ${name}.`));
    // 对比密码是否正确
    if (pass === user.password) {
        return fn(null, user);
    }
    return fn(new Error('invalid password'));
}
app.post('/login', (req, res) => {
    authenticate(req.body.name, req.body.password, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: JSON.stringify(err, ['message', 'arguments', 'type', 'name']),
            });
        }
        if (user) {
            // Regenerate session when signing in to prevent fixation
            // auth验证成功之后,重新生成新的session ID
            req.session.regenerate(() => {
                req.session.user = user;    // eslint-disable-line no-param-reassign
                res.json({ success: true, message: JSON.stringify({ name: user.name }) });
            });
        }
    });
});
function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.json({ success: false, msg: 'Access denied!' });
    }
}
app.get('/restricted', restrict, (req, res) => {
    res.json({ success: true, message: 'Woh!' });
});
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true, message: 'Oh, 退出登录了。' });
    });
});
app.get('*', (req, res) => {
    res.sendFile(path.resolve('./dist/index.html'));
});
export default app;
