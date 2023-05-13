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
    getNextMailId,
    getPrevMailId,
    remove,
    getEmptyMail,
    save,
    getDefaultCriteria,
    put,
}

function query(critera) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (critera.txt) {
                const regExp = new RegExp(critera.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (critera.status === 'sent') {
                mails = mails.filter(mail => mail.from === loggedinUser.email)
            }
            else if (critera.status === 'trash') {
                mails = mails.filter(mail => mail.removedAt)
            }
            else if (critera.status === 'inbox') {
                mails = mails.filter(mail => mail.to === loggedinUser.email)
                mails = mails.filter(mail => !mail.removedAt)
            }
            console.log(critera.isStared);
            if (critera.isStared){
                console.log('isStared');
                mails = mails.filter(mail => mail.isStared)
            }
            return mails
        })
}
function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}
function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function put(mail){
    return storageService.put(MAIL_KEY, mail)
}
function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then((mails) => {
            let mailIdx = mails.findIndex(mail => mail.id === mailId)
            if (mailIdx === mails.length - 1) mailIdx = -1
            return mails[mailIdx + 1].id
        })
}
function getPrevMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then((mails) => {
            let mailIdx = mails.findIndex(mail => mail.id === mailId)
            if (mailIdx === 0) mailIdx = mails.length
            return mails[mailIdx - 1].id
        })
}
function getEmptyMail() {
    return {
        id: utilService.makeId(),
        subject: '',
        body: '',
        isRead: false,
        isStared: false,
        sentAt: Date.now(),
        removedAt: null,
        from: loggedinUser.email,
        to: ''
    }
}
function save(mail) {
    return storageService.post(MAIL_KEY, mail)
}
function getDefaultCriteria(searchParams = { get: () => { } }) {
    return {
        status: searchParams.get('status') ||'inbox',
        txt: searchParams.get('txt') ||'',
        isRead: searchParams.get('isRead') || 'null',
        isStared: JSON.parse(searchParams.get('isStared')) || false
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: utilService.makeId(),
                subject: 'Hello',
                body: utilService.makeLorem(),
                isRead: false,
                isStared: false,
                sentAt: 1652268578000,
                removedAt: null,
                from: 'jane@example.com',
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Meeting tomorrow',
                body: utilService.makeLorem(),
                isRead: true,
                isStared: false,
                sentAt: 1652193278000,
                removedAt: null,
                from: 'admin@example.com',
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Happy Birthday!',
                body: utilService.makeLorem(),
                isRead: false,
                isStared: false,
                sentAt: 1652117978000,
                removedAt: null,
                from: 'family@example.com',
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Reminder: Payment due',
                body: utilService.makeLorem(),
                isRead: true,
                isStared: false,
                sentAt: 1652032678000,
                removedAt: null,
                from: 'billing@example.com',
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Weekend getaway',
                body: utilService.makeLorem(),
                isRead: false,
                isStared: false,
                sentAt: 1651947278000,
                removedAt: null,
                from: 'friend@example.com',
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Upcoming concert',
                body: utilService.makeLorem(),
                isRead: false,
                isStared: false,
                sentAt: 1651861878000,
                removedAt: null,
                from: 'concerts@example.com',
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'New job',
                body: utilService.makeLorem(),
                isRead: true,
                isStared: false,
                sentAt: 1651776478000,
                removedAt: null,
                from: 'friend@example.com',
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Weekend plans',
                body: utilService.makeLorem(),
                isRead: false,
                isStared: false,
                sentAt: 1651691078000,
                removedAt: null,
                from: 'david@example.com',
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Important news',
                body: utilService.makeLorem(),
                isRead: false,
                isStared: false,
                sentAt: 1651605678000,
                removedAt: null,
                from: 'colleague@example.com',
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'New Job Opportunity',
                body: utilService.makeLorem(),
                isRead: false,
                isStared: false,
                sentAt: 1638726900000,
                removedAt: null,
                from: 'friend@example.com',
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Important update',
                body: utilService.makeLorem(),
                isRead: false,
                isStared: false,
                sentAt: 1644648000000,
                removedAt: null,
                from: 'support@example.com',
                to: loggedinUser.email
            }
        ]

        utilService.saveToStorage(MAIL_KEY, mails)
    }
}
