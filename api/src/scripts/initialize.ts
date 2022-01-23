import prompt from 'prompt'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

prompt.start()

prompt.get(
  [
    {
      name: 'username',
      required: true,
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces or dashes',
    },
    {
      name: 'password',
      required: true,
      // @ts-ignore outdated type
      hidden: true,
      replace: '*',
    },
  ],
  async function (error, result: { username: string; password: string }) {
    if (error) {
      process.exit(0)
    }
    const orm = new PrismaClient()
    try {
      const hashedPassword = await bcrypt.hash(
        result.password,
        await bcrypt.genSalt()
      )
      await orm.user.create({
        data: { password: hashedPassword, username: result.username },
      })
      console.log('🌞 User created')
    } catch (error) {
      console.log('🌚 Sorry, check with your team')
    } finally {
      orm.$disconnect()
      process.exit(0)
    }
  }
)
