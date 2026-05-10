/*
  DELETE LESSON
*/
router.delete(
  "/lesson/:id",
  async (req, res) => {
    try {
      const { id } =
        req.params;

      await prisma.lesson.delete({
        where: {
          id,
        },
      });

      res.json({
        success: true,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error:
          "Failed to delete lesson",
      });
    }
  }
);