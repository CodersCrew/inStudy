import React, { PureComponent } from 'react';
import { SVGIcon } from 'components';
import { categories, questions } from './texts';
import { nl2br } from 'utils';
import {
  MainContainer,
  Header,
  Content,
  Categories,
  CategoryCard,
  Head,
  Description,
  Questions,
  List,
  Tile,
  Question,
  Answer,
} from './styles';

export default class FAQ extends PureComponent {
  state = {
    openIndex: null,
  };

  changeCategory = name => {
    if (this.props.match.params.name !== name) {
      this.setState({ openIndex: null });
      this.props.history.push(`/faq/${name}`);
    }
  };

  open = index => this.setState({ openIndex: this.state.openIndex === index ? null : index });

  Collapsible = ({ question, answer, open, index }) => (
    <Tile>
      <Question isOpened={open} onClick={() => this.open(index)}>
        <h4>{question}</h4>
        <SVGIcon
          path={`/fa-icons/${open ? 'minus' : 'plus'}-circle-light.svg`}
          fill="var(--grey5)"
          width={24}
          height={24}
        />
      </Question>
      <Answer isOpened={open}>{nl2br(answer)}</Answer>
    </Tile>
  );

  Category = ({ iconName, title, description, name, active }) => (
    <CategoryCard active={active} onClick={() => this.changeCategory(name)}>
      <Head>
        <SVGIcon path={`/fa-icons/${iconName}-light.svg`} width={24} height={24} fill="var(--grey1)" />
        <h3>{title}</h3>
      </Head>
      <Description>{description}</Description>
    </CategoryCard>
  );

  render() {
    const {
      Category,
      Collapsible,
      props: {
        match: { params },
      },
      state: { openIndex },
    } = this;
    const currentcategoryName = params.name || 'ogolne';
    const questionsList = questions[currentcategoryName];
    const currentCategory = categories.find(c => c.name === currentcategoryName);

    return (
      <MainContainer>
        <Header>Najczęściej zadawane pytania</Header>
        <Content>
          <Categories>
            {categories.map(c => (
              <Category active={currentCategory.name === c.name} key={c.name} {...c} />
            ))}
          </Categories>
          <Questions>
            <List>
              {questionsList.map((q, i) => (
                <Collapsible key={q.question} {...q} index={i} open={openIndex === i} />
              ))}
            </List>
          </Questions>
        </Content>
      </MainContainer>
    );
  }
}
