import React from "react";
import {Breadcrumb, BreadcrumbItem, Card} from "react-bootstrap";
import "../App.css";



function Title(props) {
    return (
        <Breadcrumb>
            {props.breadcrumbs.map((item, index) => (
                <BreadcrumbItem
                    key={index}
                    active={index === props.breadcrumbs.length - 1}
                    href={index === props.breadcrumbs.length - 1 ? undefined : item.url}
                >
                    {item.label}
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}


function TablePlatform(props) {
    return (
        <div>
            <Title breadcrumbs={props.breadcrumbs} />
            <Card id="card-table">
                <main className="flex-fill">{props.children}</main>
            </Card>
        </div>
    );
}

export default TablePlatform;