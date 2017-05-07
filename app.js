import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
const app = express();
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
    console.log(name, password);
    users[name] = { name, password };
    res.json({ status: 'success', user: { name } });
});
function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    const user = users[name];
    // query the db for the given username
    if (!user) return fn(new Error(`Can't find user ${name}.`));
    // 对比密码是否正确
    if (pass === user.password) {
        return fn(null, user);
    }
    fn(new Error('invalid password'));
}
app.post('/login', (req, res) => {
    authenticate(req.body.name, req.body.password, (err, user) => {
        if (user) {
            // Regenerate session when signing in to prevent fixation
            // auth验证成功之后,重新生成新的session ID
            req.session.regenerate(() => {
                // Store the user's primary key
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = user;
                res.json({ status: 'success', user: { name: user.name } });
            });
        } else {
            console.log(err);
            res.send(err);
        }
    });
});
function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.json({ access: false, msg: 'Access denied!' });
    }
}
app.get('/restricted', restrict, (req, res) => {
    res.json({ access: true, message: 'Woh!' });
});
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ status: true, msg: 'Oh, 退出登录了。' });
    });
});
app.get('*', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});
export default app;
// TODO 根据是否登录，控制menu的显示和隐藏
// TODO 复用Form。
