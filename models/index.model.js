const { connDatabase } = require("../config/database.config")
const bcrypt = require('bcrypt')

const User = require("./user.model")
const Pakar = require("./pakar.model")
const Chat = require("./chat.model")
const ChatDetail = require("./chatDetail.model")
const QuestionType = require("./QuestionType.model")
const Question = require("./question.model")
const AnswerUser = require("./AnswerUser.model")

const model = {}

model.User = User
model.Pakar = Pakar
model.Chat = Chat
model.ChatDetail = ChatDetail
model.QuestionType = QuestionType
model.Question = Question
model.AnswerUser = AnswerUser

// connDatabase.sync({ force: true }).then(() => {
//     initializeUser()
//     initialQuestionType()
// initializeView ()
// })

connDatabase.sync().then(() => {
    initializeView()
})

const initializeUser = async () => {
    await model.User.bulkCreate([{
        email: 'superuser@mail.com',
        password: bcrypt.hashSync('superuser', 10),
        name: 'Super User',
        role: 'Super User'
    }, {
        email: 'admin@mail.com',
        password: bcrypt.hashSync('admin', 10),
        name: 'Admin',
        role: 'Admin'
    }])
}

const initialQuestionType = async () => {
    const questionType = [{
        questionType: 'K1',
        result: 'Kecerdasan Verbal',
        competence: 'Berpikir dalam kata (think of words)',
        generalIndicator: 'Belajar efektif dengan cara mendengarkan, berbicara, membaca, dan menulis',
        roleModel: 'Susan Bachtiar, Choky Sitohang, Oprah Winfrey, Shakespeare',
        jobs: 'Manajer, juru dongeng, juru bicara, orator, politisi, wartawan, puisi, playwright, penyiar radio, editor majalah, penerjemah, novelis, komedian, juru tik, aktor, kurator, guru, presenter, humas, atau MC'
    }, {
        questionType: 'K2',
        result: 'Kecerdasan Logis',
        competence: 'Berpikir dalam logika dan angka (think in logic and numbers)',
        generalIndicator: 'Belajar efektif dengan berpikir secara logis dan menggunakan angka',
        roleModel: 'B. J. Habibie, Prof. Yohanes Surya, Ph.D., Albert Einstein, Thomas Alva Edison',
        jobs: 'Analis, akuntan, insinyur, dokter, ilmuwan (biologi, kimia, farmasi, fisika), programmer komputer, peneliti (riset), dan banker'
    }, {
        questionType: 'K3',
        result: 'Kecerdasan Visual',
        competence: 'Berpikir dalam gambar/visualisasi (think in pictures/visualization = Visual Learning Style)',
        generalIndicator: 'Belajar efektif dengan melihat dan memvisualisasikan gambar',
        roleModel: 'Affandi, Garin Nugroho, Leonardo Da Vinci, Steven Spielberg, serta Orville dan Wilbur Wright',
        jobs: 'Arsitek, pilot, pelaut, desainer, perencana tata kota, seniman (pengrajin, pematung, pelukis, dan lain-lain), fotografer, ataupun animator, desainer interior/dekorator, arsitek, artis, inventor, pemandu, agen iklan, kartograf (pembuat peta), juru gambar, insinyur, seni halus, desainer grafis, desainer busana, pelukis, perencana urban'
    }, {
        questionType: 'K4',
        result: 'Kecerdasan Kinestetik',
        competence: 'Berpikir dengan bergerak/movement',
        generalIndicator: 'Belajar efektif dengan eksperimen, bergerak dan manipulasi motorik',
        roleModel: 'Irfan Bachdim, Susi Susanti, Brandon, David Beckham, Michael Jordan',
        jobs: 'Aktor/aktris, pantomim, penari, atlet, guru olahraga, koreografer, ahli mekanik, terapi fisik, direktur rekreasi'
    }, {
        questionType: 'K5',
        result: 'Kecerdasan Musikal',
        competence: 'Berpikir dengan musik',
        generalIndicator: 'Belajar efektif dengan mendengarkan musik, nada, dan irama',
        roleModel: 'Adie M. S., W. R. Supratman, Agnes Monica, Mozart, Michael Jackson, Stevie Wonder',
        jobs: 'Penggubah lagu, pemusiik, penyanyi, komposer, music conductor, guru musik atau guru vokal, penulis lagu, teknisi studio, rapper, terapis musik, agen iklan, pembuat film'
    }, {
        questionType: 'K6',
        result: 'Kecerdasan Interpersonal',
        competence: 'Interaksi sosial (think by relating, talking and listening to others)',
        generalIndicator: 'Belajar efektif dengan berinteraksi dan membangun hubungan sosial dengan orang lain',
        roleModel: 'Ir. Soekarno, Bob Sadino, Sandiaga Uno, Barack Obama, Winston Churchill',
        jobs: 'Pengajar, konselor, marketing, politisi, businessman, pekerja sosial, aktor, terapis, motivator, menteri, pelobi, perwakilan serikat kerja, petugas toko, salesman,  administrator, antropologis, arbitrator, manajer, perawat, direktur personalia, humas, kepala sekolah, sosiologis, terapis, travel agent, pemimpin agama, psikolog'
    }, {
        questionType: 'K7',
        result: 'Kecerdasan Intrapersonal',
        competence: 'Berdialog dengan hati nurani, berkomunikasi dengan diri sendiri.',
        generalIndicator: 'Belajar efektif dengan berdialog dengan hati nurani, berkomunikasi dengan diri sendiri. Cenderung suka menyendiri, berpikir sendiri secara mendalam, dan refleksi diri',
        roleModel: 'Romo Mangunwijaya, Gede Prama, Paus Paulus II, Ibu Teresa, Mahatma Gandhi',
        jobs: 'Trainer, wiraswasta, penulis, peneliti, konselor, psikiatri atau psikolog, pemimpin agama, militer, investigator, editor, hakim, aktivis, clergyman, enterpreneur, perencana program, guru psikologi, filsuf, teolog, periset, konselor atau spiritual'
    }, {
        questionType: 'K8',
        result: 'Kecerdasan Naturalis',
        competence: 'Berpikir dengan relasi dengan alam , lingkungan hidup (nature oriented)',
        generalIndicator: 'Belajar efektif dengan merawat alam sekitarnya (green lifestyle)',
        roleModel: 'Prof. Emil Salim, Eka Budianta, Charles Darwin, dan Steve Irwin',
        jobs: 'Dokter hewan, ahli lingkungan hidup, ahli pertanian, pecinta alam, ahli peternakan, spesialis budidaya binatang'
    }]

    await model.QuestionType.bulkCreate(questionType)
}

const initializeView = async () => {
    await connDatabase.query("CREATE OR REPLACE VIEW v_chartCategory AS SELECT qt.result as chartLabel,COUNT(qu.id) as chartVal from questionusers as qu JOIN questiontypes as qt ON qu.QuestionTypeId = qt.id GROUP BY qt.result", { raw: true })
}

model.User.hasOne(model.Pakar)
model.Pakar.belongsTo(model.User)

model.User.hasMany(model.Chat, { foreignKey: 'user1', as: 'UserId' })
model.User.hasMany(model.Chat, { foreignKey: 'user2', as: 'PakarId' })
model.Chat.belongsTo(model.User, { foreignKey: 'user1', as: 'UserId' })
model.Chat.belongsTo(model.User, { foreignKey: 'user2', as: 'PakarId' })

model.Chat.hasMany(model.ChatDetail)
model.ChatDetail.belongsTo(model.Chat)

model.User.hasMany(model.ChatDetail, { foreignKey: 'from' })
model.User.hasMany(model.ChatDetail, { foreignKey: 'to' })
model.ChatDetail.belongsTo(model.User, { foreignKey: 'from' })
model.ChatDetail.belongsTo(model.User, { foreignKey: 'to' })

model.QuestionType.hasMany(model.Question)
model.Question.belongsTo(model.QuestionType)

model.QuestionType.hasOne(model.AnswerUser)
model.AnswerUser.belongsTo(model.QuestionType)

model.User.hasMany(model.AnswerUser)
model.AnswerUser.belongsTo(model.User)

module.exports = model