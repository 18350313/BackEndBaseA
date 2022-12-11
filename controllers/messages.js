const { request, response } = require("express")

const rootMessage = (req=request, res=response)=>{
    const {texto1, texto2} = req.query
    //if(!texto1 || !texto2){
        //res.status(400).json({
        //msg: "No se a podido enviar el mensaje, este EndPoint ocupa los parametros "texto1" y "texto2""
        //})
    //}

    if(!texto1){
        res.json({msg: "Falta el parámetro 'texto1'"})
    }

    if(!texto2){
        res.json({msg: "Falta el parámetro 'texto2'"})
    }
    res.json({msg:texto1 +' '+ texto2})
}

const hiMessage = (req=request, res=response)=>{
    const {name} = req.params
    res.json({msg:"Hola "+name})
}

const byeMessage = (req=request, res=response)=>{
    res.json({msg:"Adios mundo"})
}

const postMessage = (req=request, res=response)=>{
    const {no_control, nombre} = req.body
    //console.log({no_control, nombre})
    res.json({
        msg:`número de control = ${no_control}, nombre = ${nombre}`
    })
}

const putMessage = (req=request, res=response)=>{
    res.json({msg:"mesaje PUT"})
}

const deleteMessage = (req=request, res=response)=>{
    res.json({msg:"mesaje DELETE"})
}

module.exports={
    rootMessage,
    hiMessage,
    byeMessage,
    postMessage,
    putMessage,
    deleteMessage
}

module.exports={rootMessage,hiMessage,byeMessage,postMessage,putMessage,deleteMessage}
