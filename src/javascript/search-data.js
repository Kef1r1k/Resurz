import Airtable from 'airtable'

const token =
  'pat57aWn58MOPVcsX.04a2b0042e59bb1d5e32ea99340b7ab2c84a35686b87b9758999ab0086789529'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: token
})
const base = Airtable.base('appUdqJwOzvdKcNVq')
function getArticles() {
  return new Promise((resolve, reject) => {
    const content = []

    base('Articles')
      .select({ maxRecords: 100 })
      .firstPage()
      .then((result) => {
        result.forEach((record) => {
          content.push({
            id: record.id,
            title: record.fields['Title'],
            tags: record.fields['Tags'],
            link: record.fields['Link'],
            image: record.fields['Image'],
            style: record.fields['Style']
          })
        })

        resolve(content)
      })
  })
}

export { getArticles }
