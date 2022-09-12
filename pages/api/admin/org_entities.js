import db from '../connection'
import logger from '../../../lib/logger';

export default async function handler(req, res) {
    console.log(req.method)
    switch (req.method) {
        case "GET": {
            return getOrgentities(req, res);
        }
        case "POST": {
            return createOrgentity(req, res);
        }
    }
}

async function getOrgentities(req,res){

    const org_entities = await db.collection("ca_org_entities"); 

    var perPage = req.query.perPage ? req.query.perPage : 10,
    page = req.query.page-1
    var search = req.query.search
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
        { "$limit": perPage * req.query.page },
        { "$skip": perPage * page }
    ]).toArray(function(err,db_data){
        if(err){
            logger.error(err);
            return res.status(202).json({ message: "Error Occured Please Try Again." }); 
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
                total_data: data,
                pageIndex: req.query.page,
                total_pages: Math.ceil(count / perPage),
                total_count: count,
                prevPage: page > 0 ? true : false,
                nextPage: Math.ceil(count / perPage) === req.query.page ? false : true
            });   
        })
    });
    
}

async function createOrgentity(req,res){

    if(!req.body.org_entity_name){
        return res.status(202).json({ message: "Organization Entity Name is Required.", input: "org_entity_name" });
    }
    /* if(!req.body.org_region){
        return res.status(202).json({ message: "Organization Region is Required.", input: "org_region" });
    }
    if(!req.body.level){
        return res.status(202).json({ message: "Level is Required.", input: "level" });
    }
    if(!req.body.street_address){
        return res.status(202).json({ message: "Street Address is Required.", input: "street_address" });
    }
    if(!req.body.state){
        return res.status(202).json({ message: "State is Required.", input: "state" });
    }
    if(!req.body.country){
        return res.status(202).json({ message: "Country is Required.", input: "country" });
    }
    if(!req.body.zip_code){
        return res.status(202).json({ message: "Zip Code is Required.", input: "zip_code" });
    }
    if(!req.body.phone_no){
        return res.status(202).json({ message: "Phone Number is Required.", input: "phone_no" });
    }
    if(!req.body.contact_name){
        return res.status(202).json({ message: "Contact Name is Required.", input: "contact_name" });
    }
    if(!req.body.contact_email){
        return res.status(202).json({ message: "Contact Email is Required.", input: "contact_email" });
    }
    if(!req.body.contact_phone){
        return res.status(202).json({ message: "Contact Phone is Required.", input: "contact_phone" });
    }
    if(!req.body.no_licence_purchased){
        return res.status(202).json({ message: "Liscence Purchase Number is Required.", input: "no_licence_purchased" });
    }
    if(!req.body.licence_expiry){
        return res.status(202).json({ message: "Liscence Expiry Date is Required.", input: "licence_expiry" });
    } */

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
        "created_by":req.body.created_by,
        "modified_by":"",
        "modified_on":"",
        "date_started": new Date(),
        "created_on": new Date()
    }

    const org_entities = await db.collection("ca_org_entities"); 

    org_entities.find({ org_entity_name: req.body.org_entity_name }).toArray((error, result) => {
        if (result.length > 0) {
            return res.status(202).json({
                message: 'Organization Entity Name Already Exists.'
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
            org_entities.insertOne(data, function (error, result) {
                if (error) {
                    return res.status(202).json({
                        message: 'error occured'
                    });
                }

                if (result) {
                    return res.status(200).json({
                        message: "Created Successfully"
                    })
                }
            });
        });
    });
}