import { View, Text } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Loading = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={5}>
        <SkeletonPlaceholder.Item width={100} height={100} borderRadius={10} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={250} height={30} marginTop={-10} />
          <SkeletonPlaceholder.Item marginTop={6} width={200} height={30} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={5}>
        <SkeletonPlaceholder.Item width={100} height={100} borderRadius={10} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={250} height={30} marginTop={-10} />
          <SkeletonPlaceholder.Item marginTop={6} width={200} height={30} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={5}>
        <SkeletonPlaceholder.Item width={100} height={100} borderRadius={10} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={250} height={30} marginTop={-10} />
          <SkeletonPlaceholder.Item marginTop={6} width={200} height={30} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

export default Loading