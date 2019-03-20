import DataBase from './db.js'

class UserDatabase extends DataBase {

  constructor() {
    super('users')
    this.arguments = ['login', 'money', 'created']
  }

  getId(login) {
    return this.dates.find(user => user.login === login)
  }

  generateFakeUsers() {
    if (this.isEmpty()) {
      return [
        this.insert('Lexa', 7800, new Date('2019', '03', '05')).id,
        this.insert('Oleg', 3, new Date('2019', '03', '06')).id,
        this.insert('Macho', 8000, new Date('2019', '03', '04')).id,
        ...Array(42).fill(0).map((bot, index) => this.insert('bot' + index, 8000, new Date('2019', '03', '07')).id)
      ]
    } else return []
  }

  getCurrentUser() {
    return this.find(this.sessionUserId()) || null
  }

  updateCurrentUser(login) {
    sessionStorage['sessionUserId'] = this.getId(login).id
  }

  addMoney(money) {
    const id = this.sessionUserId()
    const userMoney = +super.find(id).money
    this.changeData(id, 'money', userMoney + +money)
  }
}

export default UserDatabase
