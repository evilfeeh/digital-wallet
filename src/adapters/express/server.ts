import * as express from 'express'
import { Request, Response, json } from 'express'
import { UserBuilder } from '../../utils'
import { Payment, Wallet, User } from '../../services'
import { Logger } from '../../adapters/logger/logger'
const logger = new Logger()
const app = express();

app.use(json())

app.post('/v1/user', async (req: Request, res: Response) => {
  const userBuilder = new UserBuilder()
  const candidate = req.body
  try {
    const user = await userBuilder
    .fullname(candidate.fullname)
    .cpfCnpj(candidate.CPF_CNPJ)
    .email(candidate.email)
    .phone(candidate.phone)
    .password(candidate.password)
    .commonUser()
    .build()

    res.status(200).json({ status: 'Success', message: "User created successfully", value: user })
  } catch (error) {
    res.status(500).json({ status: 'Error', message: "Internal error server" })
  }
})

app.post('/money', async (req: Request, res: Response) => {
  try {
    const { amount , user_email } = req.body
    const wallet = new Wallet()
    const user = new User()
  
    const user_id = (await user.get(user_email)).id;
    const response = wallet.deposit(amount, user_id)
    if (!response) res.status(401).json({ status: 'Error', message: "Deposit cannot be done" })

    res.status(200).json({ status: 'Success', message: "Money deposited successfully", value: amount })
  } catch (error) {
    logger.log('error', error.message)
    res.status(500).json({ status: 'Error', message: "Internal error server" })
  }
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.post('/transaction', (req: Request, res: Response) => {
  try {
    const order = req.body
    const payment = new Payment(order)
    const response = payment.start()
    res.status(200).json(response)

  } catch (error) {
    logger.log('error', error.message)
    res.status(500).json({ status: 'Error', message: "Transaction", value: error.message })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server is listening into ${process.env.PORT}`)
})