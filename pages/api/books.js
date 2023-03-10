import  { NextApiRequest, NextApiResponse } from 'next'

import {prisma} from '../../lib/prisma' ;


export default async function  createBookHandler(
  req,
  res
) {
  const { query, method } = req;
  switch (method) {
    case 'OPTIONS':
      res.status(200).end();
      break
    case 'GET':
      const {skip,take,categoryId,search} = query;
        const booksResult = await prisma.$transaction([
            prisma.books.count({
                where: {
                    ...(!isNaN(Number(categoryId)) && { categoryId : Number(categoryId)  }),
                    ...(search?.length && {
                        OR : [
                        { name: { contains : search }  }, 
                        { author: { contains : search } } 
                    ]})
                    },
            }),
            prisma.books.findMany({
                where: {
                  ...(!isNaN(Number(categoryId)) && { categoryId : Number(categoryId)  }),
                  ...(search?.length && {
                      OR : [
                      { name: { contains : search }  }, 
                      { author: { contains : search } } 
                  ]})
                  },
                skip : Number(skip),
                take : Number(take),
                orderBy : {
                  createdAt : 'desc'
                },
                include: {
                  category: true,
                },
              })
          ]);
        
        
       
        res.status(200).json(booksResult);
      break
    default:
      res.setHeader('Allow', ['GET','OPTIONS'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}