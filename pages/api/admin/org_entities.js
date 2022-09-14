import db from '../connection'
import logger from '../../../lib/logger';
var ObjectId = require('mongodb').ObjectID;

export default async function handler(req, res) {
    switch (req.body.action) {
        case "GET": {
            return getOrgentities(req, res);
        }
        case "CREATE": {
            return createOrgentity(req, res);
        }
        case "UPDATE": {
            return createOrgentity(req, res);
        }
        case "SINGLE": {
            return getSingleentity(req, res);
        }
    }
}

async function getOrgentities(req,res){

    const org_entities = await db.collection("ca_org_entities"); 

    var perPage = req.body.perPage ? req.body.perPage : 10,
    page = req.body.page-1
    var search = req.body.search
    const data = []
    org_entities.aggregate([
        { "$sort": { '_id' : -1 } },
        {$match: 
            {
                $and: [{}],
                $or: 
                [ 
                    { org_entity_id: { "$regex": search, "$options": "i"} },
                    { org_entity_name: { "$regex": search, "$options": "i"} },
                    { org_region: { "$regex": search, "$options": "i"} },
                    { level: { "$regex": search, "$options": "i"} },
                    { street_address: { "$regex": search, "$options": "i"} },
                    { state: { "$regex": search, "$options": "i"} },
                    { country: { "$regex": search, "$options": "i"} }
                ] 
            },
        },
        { "$limit": perPage * req.body.page },
        { "$skip": perPage * page }
    ]).toArray(function(err,db_data){
        if(err){
            logger.error(err);
            return res.status(202).json({ status: 400, message: "Error Occured Please Try Again." }); 
        }
        if(db_data.length > 0){
            db_data.forEach((element) => {
              
                data.push({
                    "id": element._id,
                    "org_id": element.org_entity_id,
                    "org_name": element.org_entity_name,
                    "center_name": element.org_entity_name,
                    "location": element.street_address
                })

            });
        }

        org_entities.find({$and: [{}], $or: 
            [ 
                { org_entity_id: { "$regex": search, "$options": "i"} },
                { org_entity_name: { "$regex": search, "$options": "i"} },
                { org_region: { "$regex": search, "$options": "i"} },
                { level: { "$regex": search, "$options": "i"} },
                { street_address: { "$regex": search, "$options": "i"} },
                { state: { "$regex": search, "$options": "i"} },
                { country: { "$regex": search, "$options": "i"} }
            ] 
        }).count(function (err, count) {
            return res.status(200).json({
                status: 200,
                total_data: data,
                pageIndex: req.body.page,
                total_pages: Math.ceil(count / perPage),
                total_count: count,
                prevPage: page > 0 ? true : false,
                nextPage: Math.ceil(count / perPage) === req.body.page ? false : true
            });   
        })
    });
    
}

async function createOrgentity(req,res){

    if(!req.body.entity_id && req.body.action == "UPDATE"){
        return res.status(202).json({ status: 400, message: "ID is Required.", input: "" });
    }
    if(!req.body.org_entity_name){
        return res.status(202).json({ status: 400, message: "Organization Entity Name is Required.", input: "org_entity_name" });
    }
    if(!req.body.org_region){
        return res.status(202).json({ status: 400, message: "Organization Region is Required.", input: "org_region" });
    }
    if(!req.body.level){
        return res.status(202).json({ status: 400, message: "Level is Required.", input: "level" });
    }
    if(!req.body.street_address){
        return res.status(202).json({ status: 400, message: "Street Address is Required.", input: "street_address" });
    }
    if(!req.body.state){
        return res.status(202).json({ status: 400, message: "State is Required.", input: "state" });
    }
    if(!req.body.country){
        return res.status(202).json({ status: 400, message: "Country is Required.", input: "country" });
    }
    if(!req.body.zip_code){
        return res.status(202).json({ status: 400, message: "Zip Code is Required.", input: "zip_code" });
    }
    if(!req.body.phone_no){
        return res.status(202).json({ status: 400, message: "Phone Number is Required.", input: "phone_no" });
    }
    if(!req.body.contact_name){
        return res.status(202).json({ status: 400, message: "Contact Name is Required.", input: "contact_name" });
    }
    if(!req.body.contact_email){
        return res.status(202).json({ status: 400, message: "Contact Email is Required.", input: "contact_email" });
    }
    if(!req.body.contact_phone){
        return res.status(202).json({ status: 400, message: "Contact Phone is Required.", input: "contact_phone" });
    }
    if(!req.body.no_licence_purchased){
        return res.status(202).json({ status: 400, message: "Liscence Purchase Number is Required.", input: "no_licence_purchased" });
    }
    if(!req.body.licence_expiry){
        return res.status(202).json({ status: 400, message: "Liscence Expiry Date is Required.", input: "licence_expiry" });
    }

    const data = {
        "org_entity_name":req.body.org_entity_name,
        "org_region":req.body.org_region,
        "level":req.body.level,
        "street_address":req.body.street_address,
        "state":req.body.state,
        "country":req.body.country,
        "zip_code":req.body.zip_code,
        "phone_no":req.body.phone_no,
        "contact_name":req.body.contact_name,
        "contact_email":req.body.contact_email,
        "contact_phone":req.body.contact_phone,
        "no_licence_purchased":req.body.no_licence_purchased,
        "licence_expiry":req.body.licence_expiry,
    }

    if(req.body.action == "UPDATE"){
        data["modified_on"] = new Date();
        data["modified_by"] = req.body.created_by;
    }else{
        data["created_by"] = req.body.created_by;
        data["created_on"] = new Date();
        data["date_started"] = new Date();
        data["is_deleted"] = 0;
    }

    const org_entities = await db.collection("ca_org_entities"); 

    org_entities.find({ org_entity_name: req.body.org_entity_name }).toArray((error, result) => {
        if (result.length > 0 && result._id != req.body.entity_id) {
            return res.status(202).json({
                status: 400,
                message: 'Organization Entity Name Already Exists.',
                input: "org_entity_name"
            });
        }
        org_entities.aggregate([{ "$sort": { '_id' : -1 } }, { $limit: 1 }]).toArray(function(lerr, lresult){

            var org_id = "";
            var ldata = lresult[0];

            if(ldata && ldata['org_entity_id']){
                org_id = ldata['org_entity_id']+1;
            }else{
                org_id = 10000;
            }

            data["org_entity_id"] = org_id;

            if(req.body.action == "UPDATE"){

                org_entities.updateOne({_id:new ObjectId(req.body.entity_id)}, {$set: data}, function (error, result) {

                    if (error) {
                        return res.status(202).json({
                            status: 400,
                            message: 'error occured'
                        });
                    }
    
                    if (result) {
                        
                        return res.status(200).json({
                            status: 200,
                            message: "Updated Successfully"
                        })
                    }
                });

            }else{

                org_entities.insertOne(data, function (error, result) {
                    if (error) {
                        return res.status(202).json({
                            status: 400,
                            message: 'error occured'
                        });
                    }

                    if (result) {
                        
                        return res.status(200).json({
                            status: 200,
                            message: "Created Successfully"
                        })
                    }
                });

            }
        });
    });
}

async function getSingleentity(req,res){

    var id = req.body.id;
    const org_entities = await db.collection("ca_org_entities"); 
    org_entities.aggregate([
        { "$sort": { '_id' : -1 } },
        {$match: 
            {
                $and: [{_id:new ObjectId(id)}],
            },
        }
    ]).toArray(function(err,db_data){
        if(err){
            logger.error(err);
            return res.status(202).json({ status: 400, message: "Error Occured Please Try Again." }); 
        }
        return res.status(200).json({ status: 200, entity_data: db_data[0] }); 
    });
    
}