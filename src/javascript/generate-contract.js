import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { saveAs } from 'file-saver'

export const generateContract = async (userAnswers, isExtendedMode) => {
  try {
    const contractTypeAnswer = userAnswers.find(
      (ans) => ans.questionId === 1
    )?.answer
    let templateUrl = '/share/templates/small_order.docx'
    if (contractTypeAnswer === 'заказ с этапами работы') {
      templateUrl = '/share/templates/steps_order.docx'
    }
    if (contractTypeAnswer === 'продолжительное сотрудничество') {
      templateUrl = '/share/templates/sotrudnichestvo.docx'
    }

    const response = await fetch(templateUrl)
    if (!response.ok) throw new Error('Не удалось загрузить шаблон')
    const buffer = await response.arrayBuffer()
    const zip = new PizZip(buffer)
    const doc = new Docxtemplater(zip)

    // Подготовка данных
    const data = {
      доп_настройки: isExtendedMode
    }

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
          data.остаток = 100 - parseInt(ans.answer || '0')
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
        case 9:
          data.приемка = ans.answer
          break
        case 11:
          data.мин_стоимость = ans.answer
          break
        case 12:
          data.конфиденциально = ans.answer === 'да'
          break
        case 13:
          data.гарантийное_обслуживание = ans.answer === 'да'
          break
        case 14:
          data.срок_обслуживания = ans.answer
          break
        case 15:
          data.неполная_передача = ans.answer === 'нет'
          break
        case 16:
          data.макс_пени = ans.answer === 'да'
          break
        case 17:
          data.пени = ans.answer
          break
      }
    }

    // Логируем данные
    console.log('Подставляемые данные:', data)
    doc.setData(data)

    // Проверяем, есть ли ошибки в данных
    try {
      doc.render()
    } catch (err) {
      console.error('Ошибка рендера:', err)
      alert('Ошибка заполнения договора. Проверьте введённые данные.')
      return
    }

    // Генерация файла
    const out = doc.getZip().generate({ type: 'blob' })

    // Для iOS Safari используем saveAs напрямую
    saveAs(out, 'договор.docx')
  } catch (error) {
    console.error('Ошибка при генерации договора:', error)
    alert(
      'Не удалось сформировать договор. Проверьте интернет или попробуйте на компьютере.'
    )
  }
}
