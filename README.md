Concerns

- [x] how to detect whether the path is to node_modules or not.
- [x] reading file from fs is good way.... but.... a bit worried about performance
    - [x] oh.. reading line until not comment is OK ??? It's ok because eslint-import's using same way
- [] If the path user write in '@dependency-relation' path wrong..., How do I handle it ?? Error is best ?? ignore is best ??
    - [] I think the best way is that user can know what's the problem in error message.
