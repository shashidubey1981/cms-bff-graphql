import { Router, Request, Response } from 'express'
import { getOrCreateAnonId } from '../utils/anonimus'
import { executeQuery, createGetAllEntriesQuery } from '@/lib/graphql';

const router = Router()


router.get('/entries', async (req: Request, res: Response) => {
  try {
    const { contentTypeUid, locale, variants} = req.query
    
    if (!locale || typeof locale !== 'string') {
      return res.status(400).json({ 
        message: 'Missing required parameter: locale' 
      })
    }

    if (!contentTypeUid || typeof contentTypeUid !== 'string') {
      return res.status(400).json({ 
        message: 'Missing required parameter: contentTypeUid' 
      })
    }
    const query = createGetAllEntriesQuery(contentTypeUid, locale, variants as string[]);
    console.log('query ->',query);

    // Execute the query
    const data = await executeQuery(query);
    console.log('data ->',data);

    return res.json({ success: true, data });

  } catch (error: any) {
    console.error('Error fetching entries:', error)
    if (error === '404 | Not found' || error?.message?.includes('404')) {
      return res.status(404).json({ 
        message: 'Entries not found' 
      })
    }
    res.status(500).json({ 
      error: 'Internal server error',
      message: error?.message || 'Failed to fetch entries'
    })
  }
})

export default router

