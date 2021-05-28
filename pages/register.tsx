import { useEffect, useState } from 'react'
import { makeUser } from '../api/user';
import { RedditCoin } from '../interfaces/coin'
import styles from '../styles/Register.module.css'

enum RegisterFormFieldEnum {
  USERNAME,
  EMAIL,
  PASSWORD, 
  REPEATPASSWORD
}

export default function Register() {

  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();
  const validFill = (): boolean => Boolean(email && username && password && repeatPassword)

  const onRegisterClick = async (e:any) => {
    e.preventDefault()
    if(email && username && password) {
     console.log (await makeUser(email,username,password))
    }
  }

  const onInputChange = (e:any, field: RegisterFormFieldEnum) => {
    const value: string = e.target.value;
    switch (field) {
      case RegisterFormFieldEnum.EMAIL:
        setEmail(value)
      break;
      case RegisterFormFieldEnum.PASSWORD:
        setPassword(value)
      break;
      case RegisterFormFieldEnum.REPEATPASSWORD:
        setRepeatPassword(value)
      break;
      case RegisterFormFieldEnum.USERNAME:
        setUsername(value)
      break;
    }
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles['center-container']}>   
        <div className={styles['form-container']}>
          <div>
            <p>Proident ad duis do amet fugiat labore aliquip ea laborum dolor tempor ut consectetur.</p>
          </div>
          <div className={styles['form-input-container']}>
            <label className={styles['form-input-label']}> Email </label>
            <input value={email} onChange={(e) => onInputChange(e, RegisterFormFieldEnum.EMAIL )} type="text" className={styles['form-input']} placeholder="email" />
          </div>
          <div className={styles['form-input-container']}>
            <label className={styles['form-input-label']}> Username </label>
            <input value={username} onChange={(e) => onInputChange(e, RegisterFormFieldEnum.USERNAME )} type="text" className={styles['form-input']} placeholder="username" />
          </div>
          <div className={styles['form-input-container']}>
            <label className={styles['form-input-label']}> Password </label>
            <input value={password} onChange={(e) => onInputChange(e, RegisterFormFieldEnum.PASSWORD )} type="password" className={styles['form-input']} placeholder="password" />
          </div>
          <div className={styles['form-input-container']}>
            <label className={styles['form-input-label']}>Repeat Password </label>
            <input value={repeatPassword} onChange={(e) => onInputChange(e, RegisterFormFieldEnum.REPEATPASSWORD )} type="password" className={styles['form-input']} placeholder="repeat password" />
          </div>
          <button disabled={!validFill()} onClick={onRegisterClick} className={styles['form-button']}>Register</button>
        </div>
      </div>
    </div>
  )
}