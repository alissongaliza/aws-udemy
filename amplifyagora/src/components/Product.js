import React from "react";
import { S3Image } from 'aws-amplify-react'
// prettier-ignore
import { Notification, Popover, Button, Dialog, Card, Form, Input, Radio } from "element-react";
import { container } from "@aws-amplify/ui";
import { convertDollarsToCents } from '../utils'
import { UserContext } from '../App'
import PayButton from './PayButton'

class Product extends React.Component {
  state = {};

  render() {
    const { product } = this.props
    return (
      <UserContext.Consumer>
        {({ user }) => {
          const isProductOwner = user && user.attributes.sub === product.owner
          return (
            <div className='card-container'>
              <Card bodyStyle={{ padding: 0, minWidth: '200px' }}>
                <S3Image
                  imgKey={product.file.key}
                  theme={{ photoImg: { maxWidth: '100%', maxHeight: "100%" } }}
                />
                <div className="card-body">
                  <h3 className="m-0">{product.description}
                    <div className="items-center">
                      <img
                        src={`https://icon.now.sh/${product.shipped ? 'markunread_mailbox' : 'mail'}`}
                        alt='Shipping icon'
                        className='icon' />
                      {product.shipped ? "Shipped" : "Emailed"}
                    </div>
                    <div className="text-right">
                      <span className="mx-1">
                        ${convertDollarsToCents(product.price)}
                      </span>
                      {!isProductOwner && (
                        <PayButton />
                      )}
                    </div>
                  </h3>
                </div>
              </Card>
            </div>
          )
        }}
      </UserContext.Consumer>
    )
  }
}

export default Product;
