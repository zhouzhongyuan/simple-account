import Login from '../Login';
class Register extends Login {
    doLogin() {
        fetch('/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${this.state.name}&password=${this.state.password}`,
        })
            .then(response => response.blob())
            .then((myBlob) => {
                console.log(myBlob);
            });
    }
}
export default Register;
