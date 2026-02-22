import { Router, Response } from 'express';
import { itemsService } from './items.service';
import { AuthRequest } from '../../middleware/auth.middleware';

const router = Router();

// CREATE
router.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      res.status(400).json({ error: 'Title, description, and status required' });
      return;
    }

    const item = await itemsService.create({ title, description, status });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// READ ALL
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt((req.query.page as string) || '1');
    const limit = parseInt((req.query.limit as string) || '20');

    const result = await itemsService.findAll(page, limit);
    res.status(200).json(result.items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// READ ONE
router.get('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam);
    const item = await itemsService.findById(id);

    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// UPDATE
router.put('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam);
    const { title, description, status } = req.body;

    const item = await itemsService.update(id, { title, description, status });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE
router.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam);
    await itemsService.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

export default router;
