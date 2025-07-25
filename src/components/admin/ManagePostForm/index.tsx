"use client";

import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { PublicPost } from "@/dto/post/dto";
import { createPostAction } from "@/actions/post/create-post-action";

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState(publicPost?.content || "");

  const initialState = {
    numero: 0,
  };
  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState
  );

  useEffect(() => {
    console.log(state.numero);
  }, [state.numero]);

  return (
    <form action={action} className="mb-16">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="ID gerado automaticamente"
          type="text"
          defaultValue={publicPost?.id || ""}
          readOnly
        />

        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Slug gerado automaticamente"
          type="text"
          defaultValue={publicPost?.slug || ""}
          readOnly
        />

        <InputText
          labelText="Autor"
          name="author"
          placeholder="Digite o nome do autor"
          type="text"
          defaultValue={publicPost?.author || ""}
        />

        <InputText
          labelText="Título"
          name="title"
          placeholder="Digite o título"
          type="text"
          defaultValue={publicPost?.title || ""}
        />

        <InputText
          labelText="Excerto"
          name="excerpt"
          placeholder="Digite o resumo"
          type="text"
          defaultValue={publicPost?.excerpt || ""}
        />

        <MarkdownEditor
          labelText="Conteúdo"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
          disabled={false}
        />

        <ImageUploader />

        <InputText
          labelText="URL da imagem de capa"
          name="coverImgUrl"
          placeholder="Digite a url da imagem"
          type="text"
          defaultValue={publicPost?.coverImageUrl || ""}
        />

        <InputCheckbox
          labelText="Publicar?"
          name="published"
          type="checkbox"
          defaultChecked={publicPost?.published || false}
        />

        <div className="mt-4">
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  );
}
