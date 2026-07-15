import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const IssueDetialsPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton></Skeleton>

      <Flex gap={"3"}>
        <Skeleton width="3rem"></Skeleton>
        <Skeleton width="6rem"></Skeleton>
      </Flex>
      <Card className="prose" mt={"4"}>
        <Skeleton count={3}></Skeleton>
      </Card>
    </Box>
  );
};
export default IssueDetialsPage;
