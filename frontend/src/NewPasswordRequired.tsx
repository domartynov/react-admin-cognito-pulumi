import * as React from "react"
import {Login, Title} from 'react-admin'
import {Button, CardActions, CircularProgress, TextField} from '@material-ui/core'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {useTranslate, useLogin, useNotify, useSafeSetState} from 'ra-core'
import {Field, Form, FieldRenderProps} from 'react-final-form'
import {authProvider} from "./authProvider";
import {useHistory} from "react-router-dom";

interface FormData {
    password1: string
    password2: string
}

interface Props {
    redirectTo?: string
}

const useStyles = makeStyles(
    (theme: Theme) => ({
        form: {
            padding: '0 1em 1em 1em',
        },
        input: {
            marginTop: '1em',
        },
        button: {
            width: '100%',
        },
        icon: {
            marginRight: theme.spacing(1),
        },
    }),
    {name: 'NewPasswordRequiredForm'}
);

export const NewPasswordRequired = () => (
    <Login>
        <Title title="New Password Required"/>
        <NewPasswordForm/>
    </Login>
)

const NewPasswordForm = (props: Props) => {
    const {redirectTo} = props;
    const [loading, setLoading] = useSafeSetState(false);
    const login = useLogin();
    const translate = useTranslate()
    const notify = useNotify()
    const classes = useStyles(props)
    const history = useHistory()

    const validate = (values: FormData) => {
        const errors: { password1?: string, password2?: string } = {}
        if (values.password1 !== values.password2) {
            errors.password1 = errors.password2 = 'Passwords mismatch'
        }
        return errors;
    };

    const submit = async (values: FormData) => {
        setLoading(true)
        try {
            await authProvider.completeNewPassword(values.password1)
            history.push(props.redirectTo || '/')
        } catch (error: any) {
            if (typeof error === 'string') notify(error)
            if (typeof error.message === 'string') notify(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form
            onSubmit={submit}
            validate={validate}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.form}>
                        <div className={classes.input}>
                            <Field
                                autoFocus
                                id="password1"
                                name="password1"
                                component={Input}
                                label='New Password'
                                type="password"
                                disabled={loading}
                            />
                        </div>
                        <div className={classes.input}>
                            <Field
                                id="password2"
                                name="password2"
                                component={Input}
                                label='Confirm Password'
                                type="password"
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <CardActions>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                            className={classes.button}
                        >
                            {loading && (
                                <CircularProgress
                                    className={classes.icon}
                                    size={18}
                                    thickness={2}
                                />
                            )}
                            {translate('ra.auth.sign_in')}
                        </Button>
                    </CardActions>
                </form>
            )}
        />
    );
}

const Input = ({
                   meta: {touched, error}, // eslint-disable-line react/prop-types
                   input: inputProps, // eslint-disable-line react/prop-types
                   ...props
               }: FieldRenderProps<string>) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);
