import Head from "next/head";
import { useRouter } from "next/router";
import { Alert, Button, Form, Input } from "antd";
import { css } from "@emotion/react";
import { useSignupMutation } from "../../lib/queries/auth/useSignupMutation";
import { useLoginMutation } from "../../lib/queries/auth/useLoginMutation";

const paginaStyle = css`
  display: grid;
  grid-template-columns: auto 600px auto;
  grid-template-rows: 100vh;
`;

const loginStyle = css`
  padding: 30vh 0 0 0;
  margin: 0;
  grid-column: 2;
  place-content: center;
  text-align: center;
`;

const logoStyle = css`
  width: 100px;
`;

const formItemStyle = {
  marginBottom: 16,
};

export default function SignUp() {
  const router = useRouter();
  const signUpMutation = useSignupMutation({});
  const loginMutation = useLoginMutation({
    onSuccess() {
      router.push("/");
    },
  });
  const handleSubmit = (data) => {
    signUpMutation.mutate(data);
    loginMutation.mutate(data);
    
  };

  return (
    <div css={paginaStyle}>
      <Head>
        <title>Sign up</title>
        <link rel="icon" href="/img/favicon.ico" />
      </Head>

      <main css={loginStyle}>
        <img
          css={logoStyle}
          width={100}
          height={100}
          src="/img/beeholder-logo.png"
          alt="Ícone com a ilustração de um beholder amarelo e preto (cores de abelha)"
        />
        <h3>Cadastre sua conta para jogar com seus amigos.</h3>
        {signUpMutation.isError && (
          <Alert
            closable
            type="error"
            message="Falha ao cadastrar usuário"
            description="Não foi possível efetuar o cadastro com os dados informados."
          />
        )}
        <Form
          css={{ marginTop: 40 }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            css={formItemStyle}
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: "Por favor digite seu e-mail!" },
            ]}
          >
            <Input type="email" placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            css={formItemStyle}
            label="Nome"
            name="name"
            rules={[
              { required: true, message: "Por favor digite seu nome de usuário" },
            ]}
          >
            <Input type="name" placeholder="Nome" />
          </Form.Item>
          <Form.Item
            css={formItemStyle}
            label="Senha"
            name="password"
            rules={[{ required: true, message: "Por favor digite sua senha!" }]}
          >
            <Input type="password" placeholder="Senha" />
          </Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={signUpMutation.isLoading}
            disabled={signUpMutation.isSuccess}
          >
            Cadastrar
          </Button>
        </Form>
      </main>
    </div>
  );
}
