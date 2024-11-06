import { AppError, catchError } from "../utilities/error/error.js"

export const createHandler = (model)=>{
    return catchError(async(req,res,next)=>{
        const newDocument = new model(req.body)

        await newDocument.save()
        return res.status(201).json({
            data: newDocument,
            statusMessage:`${model.collection.name} created successfully`
    })
    })
}

export const getSingleHandler = (model) => {
    return catchError(async (req, res, next) => {
        let document = await model.findById(req.params.id);
        
        if (document && document.addedBy) {
            document = await model.findById(req.params.id).populate('addedBy', 'firstName _id');
        }
        
        if (!document) {
            return next(new AppError(`${model.collection.name} not found`, 404, 'failed'));
        }

        return res.status(200).json({
            data: document,
        });
    });
}



export const updateHandler = (model)=>{
    return catchError(async(req,res,next)=>{
    const documents = await model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!documents) return next(new AppError(`${model.collection.name} not found`, 404,'failed'))
    
    return res.status(200).json({
        data: documents,
        message:`${model.collection.name} updated successfully`,
        statusMessage: "success"
    })
})
}

export const deleteSingleHandler = (model)=>{
    return catchError(async(req,res,next)=>{
    const document = await model.findByIdAndDelete(req.params.id)
    if(!document) return next(new AppError(`${model.collection.name} not found`, 404,'failed'))
    
    return res.status(200).json({
        message:`${model.collection.name} deleted successfully`,
        statusMessage: "success"
    })
})
}

export const deleteAllHandler = (model)=>{
    return catchError(async(req,res,next)=>{
    const documents = await model.deleteMany()
    
    return res.status(200).json({
        data: documents,
        message:`All ${model.collection.name} deleted successfully`,
        statusMessage: "success"
    })

})
}

export const searchHandler = (model)=>{
    return catchError(async(req,res,next)=>{
        const searchQuery = req.query.search
        const documents = await model.find({$text:{$search:searchQuery}})
        
        return res.status(200).json({
            data: documents,
            statusMessage: "success"
        })
    })
}

export const analsizeHandler = (model)=>{
    return catchError(async(req,res,next)=>{
        const documentsCount = await model.find().countDocuments()
        return res.status(200).json({
            message: `Total ${model.collection.name}: ${documentsCount}`,
            statusMessage: "success"
        })
    })
}

