<template>
    <f7-page class="guide">
        <h1>GUÍA DE REGISTRO Y ACCESO</h1>

        <f7-block>
            <h2>
                <f7-icon material="label" size="28"></f7-icon>&nbsp;&nbsp;REGISTRO
            </h2>
            <p>Si eres un nuevo usuario de Patbook deberás registrarte antes de poder utilizar la aplicación.</p>
            <p>En la siguiente pantalla accede a NUEVO USUARIO. Por ahora sólo tendrás que proporcionar un nombre de
                usuario de tu elección, una cuenta de correo electrónico a la que tengas acceso y una contraseña,
                también de tu elección (NOTA: la contraseña ha de ser única para Patbook, NO uses la de tu cuenta de
                correo y ha de tener, como mínimo 6 caracteres).</p>
            <p>Toca sobre REGISTRAR y habrás finalizado el proceso de registro.</p>
            <p>Por razones de seguridad y privacidad una vez registrado como usuario también se te pedirá que registres
                CADA DISPOSITIVO desde el que vayas a acceder a tu cuenta, así, aunque alguien obtenga maliciosamente
                tus datos de acceso nunca podrá acceder a tu cuenta si lo intenta desde un dispositivo que tú no hayas
                registrado previamente.</p>
            <p>Para ello, nada más registrarte, te enviaremos un email con un código y la aplicación te conducirá a la
                pantalla siguiente. Escribe allí dicho código y toca sobre REGISTRAR ESTE DISPOSITIVO.</p>
            <p>Accederás directamente a la pantalla principal de Patbook y podrás comenzar a usar la aplicación.</p>
            <p><strong>NO</strong> tendrás que volver a registrar un dispositivo que ya hayas registrado anteriormente,
                ni te volveremos a pedir el código. El sistema guardará la información y te permitirá acceder sólo con
                tu email y contraseña.</p>
            <p><strong>IMPORTANTE: </strong>Si cerraste la aplicación tras haberte registrado como usuario, pero antes
                de registrar el dispositivo, aún puedes completar el proceso la próxima vez que accedas a la aplicación.
                En la pantalla de ACCESO toca sobre REGISTRAR DISPOSITIVO y serás conducido a una nueva pantalla donde
                se te pedirá que introduzcas el email y la contraseña con que te registraste junto con el código que te
                enviamos a tu cuenta de correo.</p>
            <p><strong>NO</strong> tienes que volver a registrarte como usuario cada vez que registres un dispositivo.
            </p>
            <h2>
                <f7-icon material="label" size="28"></f7-icon>&nbsp;&nbsp;ACCESO
            </h2>
            <p>En la pantalla de ACCESO introduce tu email y contraseña.</p>
            <p>Si es la primera vez que usas un dispositivo para acceder a tu cuenta la aplicación te dirigirá a una
                pantalla que te advierte de este hecho. Introduce la cuenta de correo electrónico con que te registraste
                y te enviaremos un email con un código. En la pantalla siguiente escribe dicho código y toca sobre
                REGISTRAR ESTE DISPOSITIVO.</p>
            <p><strong>IMPORTANTE: </strong>Si cerraste la aplicación antes de registrar el dispositivo, aún puedes
                completar el proceso la próxima vez que accedas a la aplicación. En la pantalla de ACCESO toca sobre
                REGISTRAR DISPOSITIVO y serás conducido a una nueva pantalla donde se te pedirá que introduzcas el email
                y la contraseña con que te registraste junto con el código que te enviamos a tu cuenta de correo.</p>
            <h2>
                <f7-icon material="label" size="28"></f7-icon>&nbsp;&nbsp;RECUPERAR LA CONTRASEÑA
            </h2>
            <p>Si no recuerdas tu contraseña en la pantalla de ACCESO toca sobre HE OLVIDADO MI CONTRASEÑA.</p>
            <p>A continuación introduce la cuenta de correo electrónico con que te registraste, toca sobre ENVIAR y te
                enviaremos un email con un código.</p>
            <p>En la siguiente pantalla introduce dicho código y una nueva contraseña de, como mínimo, 6 caracteres.
                Toca sobre CREAR NUEVA CONTRASEÑA.</p>
            <p>Si todo ha ido bien serás devuelto a la pantalla de ACCESO y podrás acceder con tu nueva contraseña.</p>

            <br>
            <f7-button big fill round @click="proceed">CONTINUAR</f7-button>

            <f7-list simple-list>
                <f7-list-item>
                    <span>No volver a mostrar esta página *</span>
                    <f7-toggle
                            :checked="dontShowAnymore"
                            @change="dontShowAnymore = $event.target.checked"
                    ></f7-toggle>
                </f7-list-item>
                <p>
                    <small>* Si deseas ver de nuevo esta guía puedes hallarla más adelante en el menú de Más Opciones"
                    </small>
                </p>
            </f7-list>
        </f7-block>

    </f7-page>
</template>

<script>
    import F7Toggle from "framework7-vue/src/components/toggle";

    export default {
        name: 'UseGuide',
        data() {
            return {
                dontShowAnymore: false
            };
        },
        methods: {
            proceed() {
                if (this.dontShowAnymore === true) {
                    localStorage.patbookDontShowTheGuide = 'true';
                }
                this.$f7router.navigate('/login');
            }
        }
    };
</script>

<style scoped>
    .guide {
        background-color: #1ABAD4;
        color: #ffffff;
    }

    .guide h1 {
        text-align: center;
    }

    .guide h2 {
        line-height: 28px;
    }

    .button-fill {
        border: 1px solid #ffffff;
    }
</style>