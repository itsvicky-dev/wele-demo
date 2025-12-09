/*
  # Seed Default Conversations

  1. New Data
    - Insert 4 sample conversations with messages
    - Conversations: "React Tips", "Database Design", "Web Performance", "API Development"
    - Each conversation has 2-3 sample messages
*/

INSERT INTO conversations (id, title, created_at, updated_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'React Tips and Best Practices', now() - interval '3 days', now() - interval '3 days'),
  ('550e8400-e29b-41d4-a716-446655440002'::uuid, 'Database Design Patterns', now() - interval '2 days', now() - interval '2 days'),
  ('550e8400-e29b-41d4-a716-446655440003'::uuid, 'Web Performance Optimization', now() - interval '1 day', now() - interval '1 day'),
  ('550e8400-e29b-41d4-a716-446655440004'::uuid, 'Building RESTful APIs', now(), now())
ON CONFLICT DO NOTHING;

INSERT INTO messages (conversation_id, role, content, created_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'user', 'What are the best practices for React hooks?', now() - interval '3 days'),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'assistant', 'Great question! Here are some key React hooks best practices: 1) Always use hooks at the top level of your function, 2) Only call hooks from React function components, 3) Use the ESLint plugin to enforce these rules, 4) Consider custom hooks for reusable logic, 5) Be mindful of dependency arrays to avoid infinite loops.', now() - interval '3 days' + interval '1 minute'),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'user', 'How do I handle side effects properly?', now() - interval '3 days' + interval '2 minutes'),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'assistant', 'Use the useEffect hook for side effects. Remember to always include a dependency array. An empty array means the effect runs once after mount. If you need to run on specific prop changes, include those in the array. Always return a cleanup function if needed to prevent memory leaks.', now() - interval '3 days' + interval '3 minutes'),

  ('550e8400-e29b-41d4-a716-446655440002'::uuid, 'user', 'What are the key principles of database design?', now() - interval '2 days'),
  ('550e8400-e29b-41d4-a716-446655440002'::uuid, 'assistant', 'Database design relies on several core principles: 1) Normalization to reduce redundancy, 2) Primary keys to uniquely identify records, 3) Foreign keys for referential integrity, 4) Indexes for query performance, 5) Proper data types to save space, 6) Avoiding NULL values where possible.', now() - interval '2 days' + interval '1 minute'),
  ('550e8400-e29b-41d4-a716-446655440002'::uuid, 'user', 'Should I denormalize for performance?', now() - interval '2 days' + interval '2 minutes'),
  ('550e8400-e29b-41d4-a716-446655440002'::uuid, 'assistant', 'Denormalization is a trade-off. While it can improve read performance, it makes updates more complex and increases data redundancy. Use it judiciously: profile first to identify bottlenecks, consider materialized views, and only denormalize when the performance gain justifies the complexity.', now() - interval '2 days' + interval '3 minutes'),

  ('550e8400-e29b-41d4-a716-446655440003'::uuid, 'user', 'How can I improve my website performance?', now() - interval '1 day'),
  ('550e8400-e29b-41d4-a716-446655440003'::uuid, 'assistant', 'Here are essential performance optimization techniques: 1) Minimize HTTP requests through bundling and sprites, 2) Enable gzip compression, 3) Use a CDN for static assets, 4) Lazy load images and code split, 5) Minify CSS and JavaScript, 6) Cache aggressively, 7) Monitor with tools like Lighthouse and PageSpeed Insights.', now() - interval '1 day' + interval '1 minute'),
  ('550e8400-e29b-41d4-a716-446655440003'::uuid, 'user', 'What about Core Web Vitals?', now() - interval '1 day' + interval '2 minutes'),
  ('550e8400-e29b-41d4-a716-446655440003'::uuid, 'assistant', 'Core Web Vitals are crucial metrics: 1) Largest Contentful Paint (LCP) - how fast your page loads, 2) First Input Delay (FID) - responsiveness to user interaction, 3) Cumulative Layout Shift (CLS) - visual stability. Focus on these three as Google uses them in ranking. Use tools like Chrome DevTools and Web Vitals library to measure them.', now() - interval '1 day' + interval '3 minutes'),

  ('550e8400-e29b-41d4-a716-446655440004'::uuid, 'user', 'What are REST API best practices?', now()),
  ('550e8400-e29b-41d4-a716-446655440004'::uuid, 'assistant', 'Here are REST API best practices: 1) Use proper HTTP methods (GET, POST, PUT, DELETE), 2) Use meaningful URLs and avoid verbs, 3) Return appropriate status codes, 4) Version your API, 5) Implement proper authentication and authorization, 6) Rate limit requests, 7) Document your API thoroughly, 8) Use HTTPS always.', now() + interval '1 minute'),
  ('550e8400-e29b-41d4-a716-446655440004'::uuid, 'user', 'How should I handle errors?', now() + interval '2 minutes'),
  ('550e8400-e29b-41d4-a716-446655440004'::uuid, 'assistant', 'Error handling best practices: Return meaningful error messages with appropriate HTTP status codes (400 for bad requests, 401 for auth, 404 for not found, 500 for server errors). Include error codes in responses for client handling. Log errors server-side for debugging. Be consistent in your error response format. Never expose sensitive information in error messages.', now() + interval '3 minutes');