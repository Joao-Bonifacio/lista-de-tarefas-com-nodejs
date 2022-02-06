const express = require('express')
//const { location } = require('express/lib/response')
const path = require('path')
const app = express() //para usar o express

app.engine('html',require('ejs').renderFile) //pega o app (tudo o que faz referencia ao express)
app.set('view engine','ejs') //para que a view engine ler e renderizar arquivos ejs
app.use('/public',express.static(path.join(__dirname,'public'))) //para usar arquivos do diretorio public (arquivos estáticos)
app.set('views',path.join(__dirname,'/views')) //para usar arquivos
app.use(express.json()) //para trabalhar com form em json
app.use(express.urlencoded({ extended: true})) //para trabalhar com post

var tarefas = ['Estudar','Trabalhar','Operar','Assistir Série']

app.post('/',(req,res)=>{
    tarefas.push(req.body.task)
    res.render('index',{listTarefas:tarefas})
})

app.get('/',(req,res)=>{ //para renderizar o index do diretorio /views
    res.render('index',{listTarefas:tarefas})
})
app.get('/delete/:id',(req,res)=>{ //para deletar (/:id == passar o n que foi passado na url)
    //deletenado os valores
    tarefas = tarefas.filter((val,index)=>{
        if (index != req.params.id) {
            return val
        }
        setTimeout(() => {
            res.render('index',{listTarefas:tarefas})
        }, 10);
        
    })
})
app.listen(3000,()=>{
    console.log('server running...')
})
