import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { saveAs } from 'file-saver'

export const generateContract = async (userAnswers) => {
  const userAnswer = userAnswers.find((a) => a.questionId === 2)?.answer || ''
  const prepayment = userAnswers.find((a) => a.questionId === 3)?.answer || ''
  const deadline = userAnswers.find((a) => a.questionId === 4)?.answer || ''
  const optionsCount = userAnswers.find((a) => a.questionId === 5)?.answer || ''
  const optionsDeadline =
    userAnswers.find((a) => a.questionId === 6)?.answer || ''

  const data = {
    разработка: userAnswer,
    срок: deadline,
    варианты: optionsCount,
    срок_отправки: optionsDeadline
  }

  try {
    const response = await fetch('./share/templates/small_order.docx')
    const buffer = await response.arrayBuffer()
    const zip = new PizZip(buffer)
    const doc = new Docxtemplater(zip)

    await doc.renderAsync(data)

    const out = doc.getZip().generate({ type: 'blob' })
    saveAs(out, 'договор.docx')
  } catch (error) {
    console.error('Ошибка при генерации договора:', error)
  }
}
