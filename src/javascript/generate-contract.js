import { saveAs } from 'file-saver'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'

export const generateContract = async (userAnswers) => {
  try {
    const response = await fetch('/share/templates/small_order.docx')
    if (!response.ok) throw new Error('Не удалось загрузить шаблон')

    const buffer = await response.arrayBuffer()
    const zip = new PizZip(buffer)
    const doc = new Docxtemplater(zip)

    const data = {}

    for (let ans of userAnswers) {
      switch (ans.questionId) {
        case 2:
          data.проект = ans.answer
          break

        case 3:
          data.предоплата = ans.answer === 'предоплата'
          data.полная_оплата = ans.answer === 'полная оплата'
          data.пост_оплата = ans.answer === 'пост-оплата'
          break

        case 4:
          data.процент = ans.answer
          if (!isNaN(parseInt(ans.answer))) {
            data.остаток = 100 - parseInt(ans.answer)
          }
          break

        case 5:
          data.начало_работы = ans.answer
          break

        case 6:
          data.варианты = ans.answer
          break

        case 7:
          data.срок = ans.answer
          break

        case 8:
          data.финал = ans.answer
          break

        case 10:
          data.конфиденциально = ans.answer === 'да'
          break

        case 11:
          data.неполная_передача = ans.answer === 'нет'
          break

        case 12:
          data.макс_пени = ans.answer === 'да'
          break
        case 13:
          data.пени = ans.answer
          break

        default:
          break
      }
    }

    doc.setData(data)
    doc.render()

    const out = doc.getZip().generate({ type: 'blob' })
    saveAs(out, 'договор.docx')
  } catch (error) {
    console.error('Ошибка при генерации договора:', error)
    alert('Не удалось сформировать договор. Проверьте консоль на ошибки.')
  }
}
