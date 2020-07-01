<template>
  <el-main>
    <el-row class="content">
      <h1>
        <el-link href="https://vue-apollo.netlify.com/zh-cn/">Vue Apollo Client</el-link>
      </h1>
      <p>main.ts</p>
      <vue-code>
        <pre lang="javascript">
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem('token');
  if (token && (token !== 'undefined')) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  return forward(operation).map((response) => {
    return response;
  });
});

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors && graphQLErrors.length > 0) {
    graphQLErrors.forEach((error: any) => {
      if (error.code === 403) {
        window.location.href = "/";
      }
    });
  }

  if (networkError) {
    if (networkError.statusCode === 403) {
      console.warn('token 过期了.......');
    }
  }
});
const httpLink = middlewareLink.concat(errorLink);

Vue.use(VueApollo);
// 创建 apollo 客户端
const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    link: httpLink.concat(createHttpLink({
      uri: process.env.VUE_APP_APOLLO_SRV_URL,
    })),
    cache: new InMemoryCache(),
  }),
});
</pre>
      </vue-code>
    </el-row>
    <el-row class="content">
      <p>Apollo Query</p>
      <vue-code>
        <pre lang="javascript">
  // 获取课程信息
GET_LESSON_INFO(lessonType: string) {
    let info = '';
    switch (lessonType) {
        case 'courseware':
        info = 'courseware { url, name }';
        break;
        case 'cs_cover':
        info = 'cs_cover { name, type, url, size, version }';
        break;
    }
    return gql`query ($lesson_id: String!){
      cms_getLessonInfo(lesson_id: $lesson_id){
          id,  name, category { id, name, parent_id, datatype_id, definition_id },
          ${info}
        }
    }`;
},

 this.$apollo.query({
    query: GET_LESSON_INFO(type),
    variables: { lesson_id: this.lessonId },
    fetchPolicy: 'no-cache'
}).then(({ data }) => {
    console.log(data.cms_getLessonInfo || {});
}).catch(error => {
    console.log(error);
});
</pre>
      </vue-code>
    </el-row>
    <el-row class="content">
      <p>Apollo Mutation</p>
      <vue-code>
        <pre lang="javascript">
// 指定类别下增加教材
SAVE_TEXTBOOK_BY_CATEGORY: gql`mutation cms_buildSchema($input: SchemaDefine!){
        cms_buildSchema (input: $input){ 
            id,  content_data { name }, definition_id
        } 
    }`

// 保存引用,没有返回值
CMS_SAVE_FILE_LINK: gql`mutation cms_saveFileLink($input: FileLink!){
        cms_saveFileLink (input: $input)
    }`

this.$apollo.mutate({
        mutation: SAVE_TEXTBOOK_BY_CATEGORY,
        variables: {
        input: {
            name: this.textBookForm.name,
            display_label: this.textBookForm.label,
            category: this.prdvalue,
            maxCount: this.textBookForm.size
        }
    }
}).then((res: any) => {
    console.log(res.data.cms_buildSchema);
}).catch(err => {
    console.log(error);
});
</pre>
      </vue-code>
    </el-row>
  </el-main>
</template>