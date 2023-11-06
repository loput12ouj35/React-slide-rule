import exampleMap from '../Data/exampleMap';
import descriptions, { DescriptionsKind } from '../Data/descriptions';

interface Props {
  id: DescriptionsKind;
}

export default function ExampleItem({ id }: Props) {
  const { subheader, title } = descriptions[id];

  const { fileName, example } = exampleMap[id];

  return (
    <li>
      {title && <h3 id={id}>{title}</h3>}
      <p>{subheader}</p>
      {example}
      <a href={fileName}>&#x1F517; View code</a>
    </li>
  );
}
