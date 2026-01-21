import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'AI学习教程',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        系统化的AI学习教程，从基础概念到实战应用，
        帮助你快速掌握人工智能的核心知识。
      </>
    ),
  },
  {
    title: '工具使用指南',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        详细的工具使用教程，涵盖开发工具、AI工具等，
        让你快速上手各种实用工具。
      </>
    ),
  },
  {
    title: '持续更新',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        内容持续更新，紧跟AI技术发展趋势，
        为你提供最新最实用的学习资源。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
