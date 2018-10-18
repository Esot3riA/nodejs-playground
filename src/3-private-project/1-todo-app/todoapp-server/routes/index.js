module.exports = function(app, Todo) {
  
  app.get('/todos', function(req, res) {
    Todo.find({}).sort({ 'created': 1 }).exec(function(err, todos) {
      if (err)
        return res.status(500).send({ error: 'database failure' });
      res.json(todos);
    });
  });
  
  app.post('/todos', function(req, res) {
    var todo = new Todo();
    todo.content = req.body.content;
    todo.detailContent = req.body.detailContent;
    todo.checked = req.body.checked;
    
    todo.save(function(err) {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
        return;
      }
      res.json({ result: 1 });
    });
  });
  
  app.put("/todos/:todo_id", function(req, res) {
    Todo.findById(req.params.todo_id, function(err, todo) {
      if (err)
        return res.status(500).json({ error: 'database failure' });
      if (!todo)
        return res.status(404).json({ error: 'todo not found' });
      
      todo.checked = req.body.checked;
      if (req.body.content)
        todo.content = req.body.content;
      if (req.body.detailContent)
        todo.detailContent = req.body.detailContent;
      
      todo.save(function(err) {
        if (err)
          res.status(500).json({ error: 'failed to update' });
        res.json({ message: 'todo updated' });
      });
    });
  });
  
  app.delete("/todos/:todo_id", function(req, res) {
    Todo.remove({ _id: req.params.todo_id }, function(err, output) {
      if (err)
        return res.status(500).json({ error: 'database failure' });
      res.status(204).end();
    });
  });
  
};