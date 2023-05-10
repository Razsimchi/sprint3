import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createMails()

export const mailService = {
    query,
    get,
    getNextMailId
}

function query() {
    return storageService.query(MAIL_KEY)
        .then(cars => {
            return cars
        })
}
function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}
function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then((mails) => {
            let mailIdx = mails.findIndex(mail => mail.id === mailId)
            if(mailIdx === mails.length - 1) mailIdx = -1
            return mails[mailIdx + 1].id
        })
}
function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: utilService.makeId(),
                subject: 'Hello',
                body: 'How are you doing?',
                isRead: false,
                sentAt: 1652268578000,
                removedAt: null,
                from: 'jane@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Meeting tomorrow',
                body: 'Just a friendly reminder that we have a meeting tomorrow at 2pm.',
                isRead: true,
                sentAt: 1652193278000,
                removedAt: null,
                from: 'admin@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Happy Birthday!',
                body: 'Wishing you a wonderful birthday and a year filled with happiness and success!',
                isRead: false,
                sentAt: 1652117978000,
                removedAt: null,
                from: 'family@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Reminder: Payment due',
                body: 'This is a reminder that your payment is due on the 20th of this month.',
                isRead: true,
                sentAt: 1652032678000,
                removedAt: null,
                from: 'billing@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Weekend getaway',
                body: 'I found a great deal for a weekend getaway. Let me know if you are interested!',
                isRead: false,
                sentAt: 1651947278000,
                removedAt: null,
                from: 'friend@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Upcoming concert',
                body: 'Don\'t forget, we have tickets to the upcoming concert on the 15th. Can\'t wait to see you there!',
                isRead: false,
                sentAt: 1651861878000,
                removedAt: null,
                from: 'concerts@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'New job',
                body: 'I wanted to share the news that I landed a new job. I start next week!',
                isRead: true,
                sentAt: 1651776478000,
                removedAt: null,
                from: 'friend@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Weekend plans',
                body: 'I was thinking we could go hiking this weekend. What do you think?',
                isRead: false,
                sentAt: 1651691078000,
                removedAt: null,
                from: 'david@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Important news',
                body: 'I have some important news to share with you. Can we chat later today?',
                isRead: false,
                sentAt: 1651605678000,
                removedAt: null,
                from: 'colleague@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'New Job Opportunity',
                body: 'I came across a job posting that I thought you might be interested in',
                isRead: false,
                sentAt: 1638726900000,
                removedAt: null,
                from: 'friend@example.com',
                to: 'user@appsus.com'
            }
        ]

        utilService.saveToStorage(MAIL_KEY, mails)
    }
}
