
import React, { PropsWithChildren } from 'react'
import { cn } from '../../../../utils';
import { useClassicFrameStyle } from './styles';

interface ClassicFramePropw extends PropsWithChildren {
    title?: string,
    subTitle?: string,
    extra?: string,
    extraProps?: any;
    style?: React.CSSProperties,
    className?: string;
    titleClassName?: string;
    contentClassName?: string;

}



export function ClassicFrame({ children,

    title, subTitle, extra, extraProps, style,
    className,
    titleClassName,
    contentClassName
}: ClassicFramePropw) {

    const hasTitle = title || extra;
    const classicFrameStyle = useClassicFrameStyle({ hasTitle: !!hasTitle })

    //
    return (
        <div className={cn("nodeContentRenderer", classicFrameStyle.styles, className)} style={style}>
            {
                hasTitle ? <div className={cn("nodeContentRendererTitle", titleClassName)}>
                    <div className={cn("nodeContentRendererTitleBg")}></div>
                    {title ? (
                        <div
                            className={cn("nrtTitle")}
                            style={{
                                color: "#C3D4E5",
                            }}
                        >
                            {title}
                        </div>
                    ) : null}
                    {subTitle ? (
                        <div
                            className={cn("nrtSubTitle")}
                            style={{
                                color: "#C3D4E5",
                            }}
                        >
                            {subTitle}
                        </div>
                    ) : null}
                    {extra ? <div className={cn("nrtExtra")}>{extra}</div> : null}
                </div> : null
            }

            <div className={cn("nodeContentRendererContent", contentClassName)} >{children}</div>
        </div>
    )
}


ClassicFrame.schema = {
    _isJSONSchemaObject: true,
    type: 'void',
    'x-component': 'ClassicFrame',
    "x-settings": "settings:block",
    'x-decorator': 'PositionDecorator',
}
