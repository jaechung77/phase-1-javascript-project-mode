
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form').addEventListener('submit', e =>{
        e.preventDefault()
        let artistName = document.getElementById('singer').value
        fetchMusic(artistName)
        
    })

})

function fetchMusic(artistName){
    const tbody = document.getElementById('result-body')
    while(tbody.firstChild){
        tbody.removeChild(tbody.lastChild)
    }
    fetch(`https://genius.p.rapidapi.com/search?q=${artistName}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d2b93d4076mshd947ebaaf738f08p1ab3b1jsncc7589afdfa0",
            "x-rapidapi-host": "genius.p.rapidapi.com"
        }
    })
      .then(resp => resp.json())
      .then(items => {
          items.response.hits.forEach(hit =>{
              const elem = document.createElement('tr')
              const elemStr = `
              <td class='padding center'><img src=\"${hit.result.header_image_thumbnail_url}\" width=\"100px\" height=\"100px\"</td>
              <td class='padding center'>${hit.result.title}</td>
              <td class='padding center'><img src=\"${hit.result.primary_artist.image_url}\" width=\"100px\" height=\"100px\"</td>
              <td class='padding center'>${hit.result.primary_artist.name}</td>                      
              `
              const btnStr= `<td class='padding center'><button class="btn btn-success">select</button></td>`     
              elem.innerHTML = elemStr + btnStr
              tbody.appendChild(elem)

              const button = elem.querySelector('button')
              button.addEventListener('click', e =>{
                elem.remove()
                displayMyPlaylist(elemStr)
              })


          })
      })
}

function displayMyPlaylist(elemStr){
    const tbody = document.getElementById('mylist-body')    
    const elem = document.createElement('tr')
    const btnStr= `<td class='padding center'><button class="btn btn-danger">deselect</button></td>` 

    elem.innerHTML = elemStr + btnStr
    tbody.appendChild(elem)

    const button = elem.querySelector('button')
    button.addEventListener('click', e =>{
        elem.remove()
    })


}